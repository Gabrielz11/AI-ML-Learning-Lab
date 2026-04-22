import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity, TrendingUp, Hash, Ruler } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ExplanationBox from '../components/ExplanationBox';

const Regression = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runModel = () => {
    setLoading(true);
    setTimeout(() => {
      setResults({
        metrics: {
          mae: "12.4",
          rmse: "15.8",
          r2: "0.89"
        },
        explanation: "O modelo apresenta um erro médio absoluto (MAE) de 12.4 unidades. Com um R² de 0.89, podemos dizer que 89% da variabilidade dos dados é explicada pelo modelo."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Módulo de Regressão</h2>
          <p className="text-muted-foreground mt-1 text-sm">Predição de Valores Numéricos</p>
        </div>
        <button onClick={runModel} disabled={loading} className="btn-primary">
          {loading ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
          {loading ? 'Processando...' : 'Executar Regressão'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <AnimatePresence>
            {results ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricCard label="MAE (Erro Médio)" value={results.metrics.mae} icon={Hash} color="indigo" />
                  <MetricCard label="RMSE (Raiz do Erro)" value={results.metrics.rmse} icon={Ruler} color="rose" />
                  <MetricCard label="R² (Score)" value={results.metrics.r2} icon={TrendingUp} color="green" />
                </div>
                <ExplanationBox title="Análise de Performance" content={results.explanation} type="success" />
              </motion.div>
            ) : (
              <div className="card-container border-dashed h-64 flex flex-col items-center justify-center text-muted-foreground gap-4">
                <TrendingUp size={48} className="opacity-20" />
                <p>Execute o modelo para visualizar as métricas de regressão.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="card-container bg-muted/30">
          <h4 className="font-bold text-sm mb-4">Conceitos Chave</h4>
          <ul className="space-y-4 text-xs">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm shrink-0 font-bold text-primary">1</div>
              <p><span className="font-bold">MAE:</span> A média das diferenças absolutas. É fácil de interpretar pois está na mesma unidade dos dados.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm shrink-0 font-bold text-primary">2</div>
              <p><span className="font-bold">RMSE:</span> Penaliza erros maiores. Útil quando grandes desvios são indesejados.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm shrink-0 font-bold text-primary">3</div>
              <p><span className="font-bold">R²:</span> Indica quão bem o modelo se ajusta aos dados reais (0 a 1).</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Regression;
