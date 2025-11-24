import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { translate } from 'google-translate-api-x';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de busca
app.post('/api/search', async (req, res) => {
    const { tags, excludedTags } = req.body;

    try {
        // --- Syosetu Search (API) ---
        // Docs: https://dev.syosetu.com/man/api/
        // We use 'word' parameter for search terms.
        // Positive terms are space-separated. Negative terms are prefixed with '-'.

        const positiveQuery = tags.join(' ');
        const negativeQuery = excludedTags && excludedTags.length > 0
            ? excludedTags.map((t: string) => `-${t}`).join(' ')
            : '';

        const combinedQuery = `${positiveQuery} ${negativeQuery}`.trim();
        const encodedQuery = encodeURIComponent(combinedQuery);

        // 'lim' limits results. Increased to 20.
        const syosetuUrl = `https://api.syosetu.com/novelapi/api/?out=json&word=${encodedQuery}&lim=20`;

        console.log(`Fetching from Syosetu: ${syosetuUrl}`);
        const syosetuResponse = await axios.get(syosetuUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        const syosetuData = syosetuResponse.data;
        const novels: any[] = [];

        if (Array.isArray(syosetuData) && syosetuData.length > 1) {
            // Skip the first element (metadata)
            for (let i = 1; i < syosetuData.length; i++) {
                const item = syosetuData[i];
                novels.push({
                    titleJP: item.title,
                    url: `https://ncode.syosetu.com/${item.ncode.toLowerCase()}/`,
                    synopsis: item.story,
                    source: 'Shosetsuka ni Narou',
                    isOnNovelUpdates: false // Placeholder
                });
            }
        }

        // --- Kakuyomu Search (Scraping) ---
        // Kakuyomu search supports space for AND and - for NOT as well.
        const kakuyomuUrl = `https://kakuyomu.jp/search?q=${encodedQuery}`;
        console.log(`Fetching from Kakuyomu: ${kakuyomuUrl}`);

        try {
            const kakuyomuResponse = await axios.get(kakuyomuUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
            });

            const $ = cheerio.load(kakuyomuResponse.data);

            // Selectors based on Kakuyomu structure (needs verification, but standard class names usually work)
            // Example structure: .widget-workCard
            $('.widget-workCard').each((i, element) => {
                if (i >= 20) return; // Limit to 20

                const titleElement = $(element).find('.widget-workCard-title a');
                const title = titleElement.text().trim();
                const url = 'https://kakuyomu.jp' + titleElement.attr('href');
                const synopsis = $(element).find('.widget-workCard-introduction').text().trim();

                novels.push({
                    titleJP: title,
                    url: url,
                    synopsis: synopsis,
                    source: 'Kakuyomu',
                    isOnNovelUpdates: false
                });
            });
        } catch (kError) {
            console.error('Error scraping Kakuyomu:', kError);
            // Don't fail the whole request if Kakuyomu fails
        }

        // --- Translation Step ---
        console.log(`Translating ${novels.length} novels...`);

        // Process translations in parallel but with a limit if needed. 
        // For now, Promise.all is fine for small batches (20-40 items).
        await Promise.all(novels.map(async (novel) => {
            try {
                // Translate Title
                const titleRes = await translate(novel.titleJP, { to: 'en' });
                novel.titleEN_Adapted = (titleRes as any).text;

                // Translate Synopsis (truncate if too long to save time/bandwidth?)
                // For now, translate the whole thing.
                if (novel.synopsis) {
                    const synRes = await translate(novel.synopsis, { to: 'en' });
                    novel.synopsis = (synRes as any).text;
                }
            } catch (tError) {
                console.error(`Translation failed for ${novel.titleJP}:`, tError);
                // Fallback: keep original JP text if translation fails
                novel.titleEN_Adapted = novel.titleJP;
            }
        }));

        res.json({ results: novels });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar novels' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
