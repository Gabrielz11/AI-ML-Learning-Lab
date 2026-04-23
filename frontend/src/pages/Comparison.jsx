import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Trophy, 
  Zap, 
  Target, 
  Activity, 
  ShieldCheck,
  ArrowRightLeft,
  Info,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const Comparison = () => {
  const [activeTab, setActiveTab] = useState('classification');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/run-experiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_type: type,
          models: type === 'classification' 
            ? ['Logistic Regression', 'Decision Tree', 'Random Forest']
            : ['Linear Regression', 'Decision Tree Regressor'],
          lang: 'pt'
        })
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro ao buscar dados de comparação:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const getLeaderboard = () => {
    if (!data || !data.results) return [];
    return Object.entries(data.results).map(([name, res]) => {
      if (!res || !res.metrics) return null;
      return {
        name,
        score: activeTab === 'classification' ? (res.metrics['F1-score'] || 0) : 1 / ((res.metrics.MAE || 0) + 1),
        displayScore: activeTab === 'classification' 
          ? ((res.metrics['F1-score'] || 0) * 100).toFixed(1) + '%'
          : (res.metrics.MAE || 0).toFixed(2) + ' (MAE)'
      };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
  };

  const getRadarData = () => {
    if (!data || !data.results || activeTab !== 'classification') return [];
    // Standardizing metrics for the radar chart
    const metrics = ['Accuracy', 'Precision', 'Recall', 'F1-score'];
    return metrics.map(metric => {
      const row = { subject: metric };
      Object.entries(data.results).forEach(([name, res]) => {
        row[name] = (res.metrics?.[metric] || 0) * 100;
      });
      return row;
    });
  };

  const leaderboard = getLeaderboard();
  const radarData = getRadarData();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Comparação de Modelos</h2>
          <p className="text-muted-foreground mt-1 text-sm">Análise consolidada e ranking de performance dos algoritmos.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('classification')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'classification' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
          >
            Classificação
          </button>
          <button 
            onClick={() => setActiveTab('regression')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'regression' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
          >
            Regressão
          </button>
        </div>
      </header>

      {loading ? (
        <div className="h-[400px] flex flex-col items-center justify-center gap-4 card-container bg-white border-dashed">
          <Activity size={40} className="text-primary animate-spin" />
          <p className="text-slate-500 font-medium">Processando análise competitiva...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Visualização de Performance */}
            <section className="card-container bg-white">
              <h4 className="font-bold mb-6 flex items-center gap-2 text-slate-800">
                <ArrowRightLeft size={18} className="text-primary" /> 
                {activeTab === 'classification' ? 'Análise Multidimensional (Métricas %)' : 'Comparativo de Margem de Erro'}
              </h4>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {activeTab === 'classification' ? (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      {Object.keys(data.results).map((name, index) => (
                        <Radar
                          key={name}
                          name={name}
                          dataKey={name}
                          stroke={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b'}
                          fill={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : '#f59e0b'}
                          fillOpacity={0.2}
                        />
                      ))}
                      <Legend />
                      <RechartsTooltip />
                    </RadarChart>
                  ) : (
                    <BarChart 
                      layout="vertical"
                      data={Object.entries(data.results).map(([name, res]) => ({ name, mae: res.metrics.MAE }))}
                      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} label={{ value: 'MAE (Quanto menor, melhor)', position: 'bottom', offset: 0, fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} width={120} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="mae" name="Erro Médio (MAE)" fill="#10b981" radius={[0, 6, 6, 0]} barSize={30} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <Info size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {activeTab === 'classification' 
                    ? "O gráfico de radar mostra o 'formato' da inteligência de cada modelo. Um modelo perfeito preencheria todo o hexágono. Note como alguns modelos priorizam Recall sobre Precisão."
                    : "Na regressão, o sucesso é medido pela proximidade do zero. Barras menores indicam que o modelo está mais 'afiado' nas suas previsões numéricas."}
                </p>
              </div>
            </section>

            {/* Veredito Geral */}
            <section className="card-container bg-emerald-50 border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="text-emerald-600" size={24} />
                <h4 className="font-bold text-emerald-900">Veredito Consolidado</h4>
              </div>
              <div className="prose prose-sm prose-emerald max-w-none text-emerald-800">
                <p>{data.comparison}</p>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Leaderboard */}
            <section className="card-container bg-slate-900 text-white border-none shadow-xl">
              <h4 className="font-bold text-sm mb-6 flex items-center gap-2 text-indigo-400">
                <Trophy size={16} /> Leaderboard de Performance
              </h4>
              <div className="space-y-4">
                {leaderboard.map((model, index) => (
                  <div key={model.name} className="flex items-center gap-4 group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      index === 0 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold">{model.name}</div>
                      <div className="text-[10px] text-slate-400">{model.displayScore}</div>
                    </div>
                    <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  O ranking é atualizado dinamicamente baseado nos dados reais processados nesta sessão.
                </p>
              </div>
            </section>

            <section className="card-container bg-white">
              <h4 className="font-bold text-sm mb-4">Glossário de Elite</h4>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-primary uppercase">Dominância</div>
                  <p className="text-[11px] text-slate-500">Quando um modelo supera os outros em todas as métricas simultaneamente.</p>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">Resiliência</div>
                  <p className="text-[11px] text-slate-500">A capacidade do modelo de manter scores altos mesmo com dados embaralhados.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comparison;
