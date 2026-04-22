import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, HelpCircle, Activity, Info, Lightbulb } from 'lucide-react';

const Simulator = ({ title, description, features, onPredict }) => {
  const [inputs, setInputs] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (feature, value) => {
    setInputs(prev => ({ ...prev, [feature]: value }));
  };

  const handleSimulate = () => {
    setLoading(true);
    setTimeout(() => {
      const result = onPredict(inputs);
      setPrediction(result);
      setLoading(false);
    }, 800);
  };

  return (
    <section className="card-container bg-white border-t-4 border-t-indigo-500 overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap size={20} className="text-amber-500 fill-amber-500" />
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <HelpCircle size={18} className="text-slate-300 cursor-help" />
      </div>

      {/* Grid com alinhamento corrigido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
        {features.map((f) => (
          <div key={f.name} className="flex flex-col h-full">
            {/* Label Container com altura mínima para evitar quebras de layout */}
            <div className="min-h-[40px] flex flex-col justify-end mb-2">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest leading-tight">
                {f.label}
              </label>
              <span className="text-[9px] text-slate-300 font-medium mt-0.5">
                Range: {f.range}
              </span>
            </div>
            
            <input 
              type="number"
              step="0.01"
              placeholder={f.placeholder}
              onChange={(e) => handleInputChange(f.name, e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-semibold shadow-sm placeholder:text-slate-300"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 pt-8 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button 
            onClick={handleSimulate}
            disabled={loading || Object.keys(inputs).length < features.length}
            className="btn-primary w-full sm:w-auto shadow-lg shadow-indigo-200 min-w-[200px]"
          >
            {loading ? <Activity size={18} className="animate-spin" /> : <Zap size={18} />}
            {loading ? 'IA Processando...' : 'Realizar Predição'}
          </button>

          <AnimatePresence mode="wait">
            {prediction && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl border ${
                  prediction.status === 'success' 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                    : prediction.status === 'danger'
                    ? 'bg-rose-50 border-rose-100 text-rose-700'
                    : 'bg-indigo-50 border-indigo-100 text-indigo-700'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Resultado:</div>
                <div className="text-lg font-bold">{prediction.label}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {prediction && prediction.explanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"
            >
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                <Lightbulb size={14} /> Análise da IA
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {prediction.explanation}
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-start gap-2">
                <Info size={14} className="text-slate-400 mt-0.5" />
                <p className="text-[11px] text-muted-foreground italic">
                  <span className="font-bold">O que seria o ideal?</span> {prediction.ideal}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Simulator;
