import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BrainCircuit, 
  LineChart, 
  BarChart3, 
  GraduationCap,
  Database,
  Search,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const PageCard = ({ title, desc, icon: Icon, onClick, color, badge }) => (
  <button 
    onClick={onClick}
    className="card-container text-left group flex flex-col gap-6 relative overflow-hidden"
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
    {/* Subtle background decoration */}
    <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${color.split(' ')[1]}`}>
      <Icon size={80} />
    </div>
  </button>
);

const Home = ({ onNavigate }) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-50 rounded-[2rem] p-4">
        <div className="p-10 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <BookOpen size={24} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">Modo Estudo: O Caminho do Dado</h3>
          <p className="text-slate-600 leading-relaxed">
            Aprenda como os dados são preparados, por que dividimos em conjuntos de treino e teste, e como interpretar cada métrica sem segredos.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
              Explicações em linguagem simples e direta
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
              Visualizações interativas de cada etapa
            </div>
          </div>
          <button 
            onClick={() => onNavigate('learning')}
            className="btn-primary mt-4"
          >
            Acessar Trilhas Educativas
          </button>
        </div>
        <div className="relative h-full min-h-[300px] rounded-[1.5rem] bg-indigo-900 overflow-hidden group">
          {/* Mock UI illustration */}
          <div className="absolute inset-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-4 space-y-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-[60%] bg-white/10 rounded"></div>
              <div className="h-4 w-[80%] bg-white/10 rounded"></div>
            </div>
            <div className="h-32 w-full bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-400/20">
              <TrendingUp className="text-indigo-300 animate-pulse" size={40} />
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
