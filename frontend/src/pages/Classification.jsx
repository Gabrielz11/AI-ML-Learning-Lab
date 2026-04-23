import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Activity,
  Target,
  Zap,
  ShieldCheck,
  Database,
  Info,
  BarChart3,
  HelpCircle,
  GraduationCap,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ExplanationBox from '../components/ExplanationBox';
import DataTable from '../components/DataTable';
import Simulator from '../components/Simulator';
import { content } from '../translations';

const t = content.pt.classification;

const Classification = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [comparison, setComparison] = useState("");
  const [chartData, setChartData] = useState([]);

  const runModel = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/run-experiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_type: 'classification',
          models: ['Logistic Regression', 'Decision Tree', 'Random Forest'],
          lang: 'pt'
        })
      });
      const data = await response.json();

      const modelsResults = data.results;
      const modelComparison = data.comparison;

      // Select Random Forest as the primary display model
      const primaryModel = modelsResults['Random Forest'] || Object.values(modelsResults)[0];

      const newChartData = Object.entries(modelsResults).map(([name, res]) => ({
        name: name,
        accuracy: (res.metrics.Accuracy * 100).toFixed(1),
        f1: (res.metrics['F1-score'] * 100).toFixed(1)
      }));

      const cm = primaryModel.metrics['Confusion Matrix'];
      const formattedCM = [
        { label: 'Real: Benigno', predBenigno: cm[0][0], predMaligno: cm[0][1] },
        { label: 'Real: Maligno', predBenigno: cm[1][0], predMaligno: cm[1][1] }
      ];

      setResults({
        metrics: {
          accuracy: (primaryModel.metrics.Accuracy * 100).toFixed(1) + "%",
          precision: (primaryModel.metrics.Precision * 100).toFixed(1) + "%",
          recall: (primaryModel.metrics.Recall * 100).toFixed(1) + "%",
          f1: (primaryModel.metrics['F1-score'] * 100).toFixed(1) + "%"
        },
        confusionMatrix: formattedCM,
        explanation: primaryModel.explanation
      });

      setComparison(modelComparison);
      setChartData(newChartData);


      setChartData(newChartData);
    } catch (error) {
      console.error("Erro ao treinar modelos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = (inputs) => {
    const radius = parseFloat(inputs.radius);
    const texture = parseFloat(inputs.texture);
    const area = parseFloat(inputs.area);
    const score = (radius * 10) + (texture * 2) + (area * 0.1);
    const isMalignant = score > 300;

    return {
      label: isMalignant ? 'Maligno' : 'Benigno',
      status: isMalignant ? 'danger' : 'success',
      explanation: isMalignant
        ? `A IA classificou como Maligno pois as medidas de Raio (${radius}) e Área (${area}) estão significativamente acima da média do dataset para tecidos saudáveis.`
        : `A IA classificou como Benigno. As características celulares inseridas estão dentro do padrão de tecidos normais observado durante o treinamento.`,
      ideal: "O ideal para um diagnóstico preventivo é que o modelo tenha um alto Recall (não deixe passar casos positivos) e que os dados do simulador sejam comparados com exames laboratoriais reais."
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t.title}</h2>
          <p className="text-muted-foreground mt-1 text-sm">{t.subtitle}</p>
        </div>
        <button
          onClick={runModel}
          disabled={loading}
          className="btn-primary shadow-indigo-200 shadow-lg"
        >
          {loading ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
          {loading ? 'Treinando...' : 'Executar Treinamento'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card-container bg-white border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 mb-4">
              <Database size={16} /> Fonte de Dados: Breast Cancer Wisconsin
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "{t.datasetInfo.replace('**', '').replace('**', '')}"
            </p>
          </section>

          <AnimatePresence>
            {results && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MetricCard label={t.metrics.accuracy.label} value={results.metrics.accuracy} icon={Target} color="indigo" />
                  <MetricCard label={t.metrics.precision.label} value={results.metrics.precision} icon={ShieldCheck} color="blue" />
                  <MetricCard label={t.metrics.recall.label} value={results.metrics.recall} icon={Zap} color="amber" />
                  <MetricCard label={t.metrics.f1.label} value={results.metrics.f1} icon={Activity} color="green" />
                </div>

                {/* Gráfico de Barras com Explicação */}
                <section className="card-container bg-white">
                  <h4 className="font-bold mb-6 flex items-center gap-2 text-slate-800">
                    <BarChart3 size={18} className="text-indigo-500" /> Comparativo de Performance (%)
                  </h4>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 100]} />
                        <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="accuracy" name="Acurácia" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
                        <Bar dataKey="f1" name="F1-Score" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <h5 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <Info size={16} className="text-indigo-500" /> Como entender estas barras?
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-muted-foreground leading-relaxed">
                      <div className="space-y-2">
                        <p><strong className="text-indigo-600">Barra Azul (Acurácia):</strong> É a nota geral da IA. Ela diz o percentual total de acertos do modelo (tanto para casos benignos quanto malignos).</p>
                        <p><strong className="text-emerald-600">Barra Verde (F1-Score):</strong> É a métrica de "equilíbrio". Ela é vital na saúde porque garante que o modelo não está apenas "chutando" o resultado mais comum, mas sim sendo preciso em detectar a doença.</p>
                      </div>
                      <div className="space-y-2">
                        <p><strong>Por que comparar?</strong> Nem sempre o modelo com a barra azul mais alta é o melhor. Em medicina, preferimos modelos com a <strong>barra verde alta</strong>, pois eles erram menos na detecção de casos críticos.</p>
                        <p>O gráfico compara os resultados reais processados pelo backend agora.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <Simulator
                  title="Simulador de Diagnóstico"
                  description="Insira dados de um novo paciente para testar a IA."
                  onPredict={handlePredict}
                  features={[
                    { name: 'radius', label: 'Raio Médio', range: '6.9 - 28.1', placeholder: '14.0' },
                    { name: 'texture', label: 'Textura Média', range: '9.7 - 39.2', placeholder: '19.0' },
                    { name: 'area', label: 'Área Média', range: '143 - 2501', placeholder: '650.0' },
                  ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-container">
                    <h4 className="font-bold mb-4 flex items-center gap-2 text-slate-800">Matriz de Confusão (Real vs. IA)</h4>
                    <DataTable
                      columns={[
                        { header: 'Status Real', key: 'label' },
                        { header: 'Predito: Benigno', key: 'predBenigno' },
                        { header: 'Predito: Maligno', key: 'predMaligno' }
                      ]}
                      data={results.confusionMatrix}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2">Explicação Detalhada</h4>
                  <ExplanationBox content={results.explanation} type="info" />
                  
                  {comparison && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <h4 className="font-bold text-emerald-800 flex items-center gap-2 mt-8">Veredito do Especialista</h4>
                      <ExplanationBox content={comparison} type="success" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <section className="card-container bg-slate-900 text-white border-none">
            <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-indigo-400"><GraduationCap size={18} /> {t.learnMore.training.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{t.learnMore.training.text}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Classification;
