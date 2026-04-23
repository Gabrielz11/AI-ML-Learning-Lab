import React from 'react';
import { Award, BarChart3, TrendingUp, Zap } from 'lucide-react';
import DataTable from '../components/DataTable';

const Comparison = () => {
  const models = [
    { name: 'Logistic Regression', acc: 0.94, recall: 0.92, f1: 0.93, speed: 'Fast' },
    { name: 'Decision Tree', acc: 0.92, recall: 0.90, f1: 0.91, speed: 'Fast' },
    { name: 'Random Forest', acc: 0.98, recall: 0.97, f1: 0.98, speed: 'Medium' },
    { name: 'SVM', acc: 0.96, recall: 0.95, f1: 0.95, speed: 'Slow' },
  ];

  const columns = [
    { 
      header: 'Nome do Modelo', 
      key: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          {row.acc === 0.98 && <Award size={16} className="text-amber-500" />}
          {val}
        </div>
      )
    },
    { 
      header: 'Acurácia', 
      key: 'acc', 
      render: (val) => <span className="font-mono">{(val * 100).toFixed(1)}%</span> 
    },
    { 
      header: 'Recall', 
      key: 'recall', 
      render: (val) => <span className="font-mono">{(val * 100).toFixed(1)}%</span> 
    },
    { 
      header: 'F1-Score', 
      key: 'f1', 
      render: (val) => <span className="font-mono">{(val * 100).toFixed(1)}%</span> 
    },
    { 
      header: 'Velocidade', 
      key: 'speed',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          val === 'Fast' ? 'bg-emerald-100 text-emerald-700' : 
          val === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {val}
        </span>
      )
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Comparação de Modelos</h2>
        <p className="text-muted-foreground mt-1 text-sm">Visão consolidada da performance dos algoritmos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card-container">
            <h4 className="font-bold mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" /> Tabela Comparativa
            </h4>
            <DataTable 
              columns={columns} 
              data={models} 
              highlightRow={2} // Random Forest
            />
          </div>
        </div>

        <div className="space-y-6">
          <section className="card-container bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none shadow-indigo-200">
            <Award size={32} className="mb-4 text-amber-300" />
            <h4 className="font-bold text-lg mb-2">Melhor Performance</h4>
            <p className="text-sm text-indigo-100 leading-relaxed">
              O modelo <span className="font-bold text-white">Random Forest</span> apresentou os melhores resultados em todas as métricas de classificação.
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex justify-between text-xs mb-1 font-medium opacity-80">
                <span>Vantagem sobre o 2º colocado</span>
                <span>+2.1%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-amber-400 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>
          </section>

          <section className="card-container">
            <h4 className="font-bold text-sm mb-4">Trade-offs</h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Zap size={16} className="text-amber-500 mt-1 shrink-0" />
                <p className="text-[11px] text-muted-foreground">
                  Modelos mais precisos como Random Forest costumam ser mais lentos e consomem mais memória que a Regressão Logística.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <TrendingUp size={16} className="text-emerald-500 mt-1 shrink-0" />
                <p className="text-[11px] text-muted-foreground">
                  Para datasets pequenos, a diferença de performance pode não justificar o uso de modelos complexos.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
