import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface StatusConsoleProps {
  status: 'idle' | 'searching' | 'complete';
  logs: string[];
}

export const StatusConsole: React.FC<StatusConsoleProps> = ({ status, logs }) => {
  if (status === 'idle' && logs.length === 0) return null;

  return (
    <div className="bg-black/40 rounded-lg p-4 font-mono text-xs border border-slate-800 shadow-inner mb-8 h-32 overflow-y-auto scrollbar-hide">
      {logs.map((log, i) => (
        <div key={i} className="mb-1 flex items-start gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
          <span className={
            log.includes('FILTERED') ? 'text-red-400' :
            log.includes('FOUND') ? 'text-emerald-400' :
            log.includes('Searching') ? 'text-blue-400' : 'text-slate-300'
          }>
            {log}
          </span>
        </div>
      ))}
      {status === 'searching' && (
        <div className="flex items-center gap-2 text-indigo-400 mt-2">
           <Loader2 size={12} className="animate-spin" />
           <span className="animate-pulse">Scanning repositories...</span>
        </div>
      )}
    </div>
  );
};