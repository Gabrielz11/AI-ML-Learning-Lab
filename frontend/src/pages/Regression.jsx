import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Activity, 
  TrendingUp, 
  Hash, 
  Ruler, 
  Info, 
  LineChart as LineChartIcon,
  Database,
  Target
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Line,
  ComposedChart,
  ZAxis,
  Legend,
  Scatter
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ExplanationBox from '../components/ExplanationBox';
import Simulator from '../components/Simulator';

const Regression = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Dados de dispersão (Pontos)
  const scatterData = Array.from({ length: 40 }, (_, i) => ({
    actual: Math.floor(Math.random() * 200) + 50,
    predicted: 0,
  })).map(d => ({
    ...d,
    predicted: d.actual + (Math.random() * 50 - 25)
  }));

  // Dados da Linha Ideal (Deve usar os mesmos nomes de campo: actual e predicted)
  const lineData = [
    { actual: 50, predicted: 50 }, 
    { actual: 250, predicted: 250 }
  ];

  const runModel = () => {
    setLoading(true);
    setTimeout(() => {
      setResults({
        metrics: { mae: "12.4", rmse: "15.8", r2: "0.89" },
        explanation: "O modelo apresenta um excelente ajuste aos dados (R² de 0.89). A maioria das predições está próxima da linha ideal, indicando que os padrões de progressão da diabetes foram capturados com sucesso."
      });
      setLoading(false);
    }, 1500);
  };

  const handlePredict = (inputs) => {
    const bmi = parseFloat(inputs.bmi);
    const age = parseFloat(inputs.age);
    const bp = parseFloat(inputs.bp);
    const score = (bmi * 2.5) + (age * 0.8) + (bp * 0.5);
    
    let explanation = "";
    if (bmi > 30) {
      explanation = `O score deu elevado (${score.toFixed(1)}) principalmente devido ao IMC alto. Na nossa base de dados, pacientes com IMC acima de 30 tendem a ter uma progressão da doença muito mais rápida.`;
    } else if (age > 60) {
      explanation = `A idade avançada foi o fator predominante para este resultado. O modelo identificou que o tempo de exposição aos fatores de risco aumenta o índice de progressão.`;
    } else {
      explanation = `O resultado indica uma progressão moderada. A IA combinou os três fatores de forma equilibrada.`;
    }

    return { 
      label: `Score: ${score.toFixed(1)}`, 
      status: score > 180 ? 'danger' : 'info',
      explanation: explanation,
      ideal: "Para este cenário de Diabetes, o ideal seria um score abaixo de 100, indicando progressão lenta ou estável."
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Módulo de Regressão</h2>
          <p className="text-muted-foreground mt-1 text-sm">Análise visual de predições contínuas.</p>
        </div>
        <button onClick={runModel} disabled={loading} className="btn-primary shadow-emerald-200 shadow-lg" style={{ backgroundColor: '#10b981' }}>
          {loading ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
          {loading ? 'Processando...' : 'Executar Regressão'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card-container border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-600 mb-3"><Database size={16} /> Cenário: Progressão da Diabetes</div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">"O objetivo é prever um índice quantitativo da progressão da doença após um ano baseado em variáveis fisiológicas."</p>
          </section>

          <AnimatePresence>
            {results && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricCard label="MAE (Erro Médio)" value={results.metrics.mae} icon={Hash} color="indigo" />
                  <MetricCard label="RMSE" value={results.metrics.rmse} icon={Ruler} color="rose" />
                  <MetricCard label="R² Score" value={results.metrics.r2} icon={TrendingUp} color="green" />
                </div>

                <section className="card-container bg-white">
                  <h4 className="font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <LineChartIcon size={18} className="text-emerald-500" /> 
                    Análise de Dispersão: Real vs. Preditivo
                  </h4>
                  <div className="h-[380px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          type="number" 
                          dataKey="actual" 
                          name="Real" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: '#94a3b8' }}
                          label={{ value: 'Valor Real', position: 'bottom', offset: 0, fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="predicted" 
                          name="Predito" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fill: '#94a3b8' }}
                          label={{ value: 'Previsão da IA', angle: -90, position: 'left', offset: 0, fontSize: 12, fill: '#64748b' }}
                        />
                        <ZAxis range={[60, 60]} />
                        <RechartsTooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="top" height={36} />
                        
                        <Scatter name="Casos Individuais" data={scatterData} fill="#6366f1" opacity={0.5} />
                        
                        {/* Linha de Predição Ideal Corrigida */}
                        <Line 
                          type="monotone" 
                          data={lineData} 
                          dataKey="predicted" 
                          stroke="#10b981" 
                          strokeWidth={3} 
                          strokeDasharray="5 5"
                          dot={false} 
                          activeDot={false} 
                          name="Linha de Predição Ideal (Erro Zero)" 
                          animationDuration={1000}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <h5 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <Info size={16} className="text-indigo-500" /> Como ler este gráfico?
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground leading-relaxed">
                      <div className="space-y-2">
                        <p><strong className="text-emerald-600 font-bold">A Linha Tracejada Verde:</strong> Representa a "Perfeição". Se um ponto estiver exatamente sobre ela, a IA acertou o valor com 100% de precisão.</p>
                        <p><strong className="text-indigo-600 font-bold">Os Pontos Azuis:</strong> Representam cada paciente testado. A distância entre o ponto e a linha é o que chamamos de <strong>Erro</strong>.</p>
                      </div>
                      <div className="space-y-2">
                        <p>Quanto mais agrupados ao redor da linha os pontos estiverem, melhor é o seu modelo.</p>
                        <p>Pontos muito distantes (Outliers) indicam casos onde a IA teve dificuldade em prever a progressão da doença.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <Simulator 
                  title="Simulador de Progressão"
                  description="Teste a IA com dados clínicos personalizados."
                  onPredict={handlePredict}
                  features={[
                    { name: 'age', label: 'Idade', range: '19 - 79', placeholder: '45' },
                    { name: 'bmi', label: 'IMC (Índice de Massa Corporal)', range: '18.0 - 42.2', placeholder: '24.5' },
                    { name: 'bp', label: 'Pressão Sanguínea', range: '60 - 133', placeholder: '90' },
                  ]}
                />

                <ExplanationBox title="Veredito da Performance" content={results.explanation} type="success" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <section className="card-container bg-emerald-900 text-white border-none shadow-lg shadow-emerald-100">
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-emerald-400"><TrendingUp size={18} /> Resumo Teórico</h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed">Na regressão, o objetivo é minimizar a distância entre os pontos azuis e a linha verde.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Regression;
