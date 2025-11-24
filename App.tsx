import React from 'react';
import { GemHunter } from './GemHunter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <GemHunter />
    </div>
  );
};

export default App;