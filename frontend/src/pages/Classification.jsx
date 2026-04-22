import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity, Target, Zap, ShieldCheck, Database, Info } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ExplanationBox from '../components/ExplanationBox';
import DataTable from '../components/DataTable';

const Classification = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const runModel = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setResults({
        metrics: {
          accuracy: "98.2%",
          precision: "97.5%",
          recall: "99.1%",
          f1: "98.3%"
        },
        confusionMatrix: [
          { label: 'Real: Maligno', predMaligno: 52, predBenigno: 1 },
          { label: 'Real: Benigno', predMaligno: 2, predBenigno: 116 }
        ],
        explanation: "O modelo detectou corretamente 99.1% dos casos positivos (Recall). Em diagnósticos de saúde, um alto Recall é fundamental para garantir que pacientes com a condição não passem despercebidos."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Motor de Classificação</h2>
          <p className="text-muted-foreground mt-1 text-sm">Dataset: Breast Cancer Diagnostic (Wisconsin)</p>
        </div>
        <button 
          onClick={runModel}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
          {loading ? 'Treinando...' : 'Executar Modelo'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <section className="card-container space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-600">
              <Database size={16} /> Sobre os Dados
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Este dataset contém características computadas de uma imagem digitalizada de um aspirado por agulha fina (FNA) de uma massa mamária. Eles descrevem características dos núcleos celulares presentes na imagem.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600">30 Atributos</span>
              <span className="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600">569 Instâncias</span>
              <span className="px-2 py-1 rounded bg-indigo-100 text-[10px] font-bold text-indigo-600">Binário (M/B)</span>
            </div>
          </section>

          <AnimatePresence>
            {results && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MetricCard label="Acurácia" value={results.metrics.accuracy} icon={Target} color="indigo" />
                  <MetricCard label="Precisão" value={results.metrics.precision} icon={ShieldCheck} color="blue" />
                  <MetricCard label="Recall" value={results.metrics.recall} icon={Zap} color="amber" />
                  <MetricCard label="F1-Score" value={results.metrics.f1} icon={Activity} color="green" />
                </div>

                <div className="card-container">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    Matriz de Confusão
                    <div className="group relative">
                      <Info size={14} className="text-muted-foreground" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Mostra o número de previsões corretas e incorretas comparadas aos valores reais.
                      </div>
                    </div>
                  </h4>
                  <DataTable 
                    columns={[
                      { header: '', key: 'label' },
                      { header: 'Predito: Maligno', key: 'predMaligno' },
                      { header: 'Predito: Benigno', key: 'predBenigno' },
                    ]}
                    data={results.confusionMatrix}
                  />
                </div>

                <ExplanationBox 
                  title="O que isso significa?" 
                  content={results.explanation} 
                  type="info"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <section className="card-container bg-slate-50/50 border-dashed">
            <h4 className="font-bold text-sm mb-4">Dica do Professor</h4>
            <div className="space-y-4">
              <div className="p-3 bg-white rounded-lg border border-border shadow-sm">
                <p className="text-xs leading-relaxed italic">
                  "Lembre-se: em saúde, um falso negativo é muito mais custoso que um falso positivo. Por isso focamos no Recall."
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                <p className="font-bold text-slate-700 mb-1">Próximo Passo:</p>
                Tente rodar uma Árvore de Decisão no menu de comparação para ver se a interpretabilidade melhora.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Classification;
