import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  LineChart,
  BarChart3,
  History,
  CheckCircle2,
  Zap,
  Activity as ActivityIcon,
  Clock
} from 'lucide-react';

const PageCard = ({ title, desc, icon: Icon, onClick, color, badge }) => (
  <button
    onClick={onClick}
    className="card-container text-left group flex flex-col gap-6 relative overflow-hidden h-full"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-tighter">
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed italic">
        {desc}
      </p>
    </div>
    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
      Explorar módulo <ArrowRight size={16} />
    </div>
  </button>
);

const ActivityItem = ({ model, type, metric, time, status }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === 'Classificação' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
        {type === 'Classificação' ? <BrainCircuit size={18} /> : <LineChart size={18} />}
      </div>
      <div>
        <h5 className="text-sm font-bold text-slate-800">{model}</h5>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold">
          <span>{type}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="flex items-center gap-1"><Clock size={10} /> {time}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <div className="text-sm font-bold text-slate-900">{metric}</div>
        <div className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
          <CheckCircle2 size={10} /> {status}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={16} className="text-slate-300" />
      </div>
    </div>
  </div>
);

const Home = ({ onNavigate }) => {
  const recentActivities = [
    { model: 'Random Forest Classifier', type: 'Classificação', metric: '98.2% Acc', time: 'Há 5 min', status: 'Sucesso' },
    { model: 'Linear Regression', type: 'Regressão', metric: '12.4 MAE', time: 'Há 15 min', status: 'Concluído' },
    { model: 'Logistic Regression', type: 'Classificação', metric: '94.2% Acc', time: 'Há 1 hora', status: 'Alta Precisão' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
            <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
            Nexus ML Platform
          </div>
          <h2 className="text-5xl font-extrabold tracking-tight mt-4 leading-tight">
            Desvende a <span className="gradient-text">Inteligência Artificial</span> <br />
            através de dados reais.
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Bem-vindo ao seu laboratório interativo. Aqui, algoritmos deixam de ser "caixas pretas" e se tornam ferramentas visuais que você pode experimentar, comparar e dominar.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PageCard
          title="Classificação"
          desc="Ensine a máquina a distinguir entre categorias. Exemplo: Diagnóstico de Câncer de Mama."
          icon={BrainCircuit}
          onClick={() => onNavigate('classification')}
          color="bg-indigo-500/10 text-indigo-500"
          badge="Supervisionado"
        />
        <PageCard
          title="Regressão"
          desc="Preveja valores numéricos exatos. Exemplo: Progressão de doenças baseada em IMC."
          icon={LineChart}
          onClick={() => onNavigate('regression')}
          color="bg-emerald-500/10 text-emerald-500"
          badge="Numérico"
        />
        <PageCard
          title="Comparação"
          desc="Compare múltiplos algoritmos lado a lado e analise trade-offs de performance e custo."
          icon={BarChart3}
          onClick={() => onNavigate('comparison')}
          color="bg-amber-500/10 text-amber-500"
          badge="Analytics"
        />
      </div>
    </div>
  );
};

export default Home;
