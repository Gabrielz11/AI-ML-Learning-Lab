import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, LineChart, BarChart3, GraduationCap } from 'lucide-react';

const PageCard = ({ title, desc, icon: Icon, onClick, color }) => (
  <button 
    onClick={onClick}
    className="card-container text-left group flex flex-col gap-6"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
      Começar agora <ArrowRight size={16} />
    </div>
  </button>
);

const Home = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <section className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Bem-vindo ao Nexus ML
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-4">
            Aprenda Machine Learning de <span className="gradient-text">forma visual.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            O Nexus ML é seu laboratório interativo para dominar algoritmos. Explore, experimente e entenda o que acontece por trás das previsões.
          </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PageCard 
          title="Classificação"
          desc="Ensine a máquina a categorizar dados. Ideal para diagnósticos e detecção de fraude."
          icon={BrainCircuit}
          onClick={() => onNavigate('classification')}
          color="bg-indigo-500/10 text-indigo-500"
        />
        <PageCard 
          title="Regressão"
          desc="Preveja valores numéricos contínuos como preços de imóveis ou tendências de vendas."
          icon={LineChart}
          onClick={() => onNavigate('regression')}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <PageCard 
          title="Comparação"
          desc="Analise múltiplos modelos lado a lado e descubra qual performa melhor."
          icon={BarChart3}
          onClick={() => onNavigate('comparison')}
          color="bg-amber-500/10 text-amber-500"
        />
      </div>

      <section className="bg-slate-900 rounded-3xl p-10 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-xl">
          <GraduationCap size={48} className="text-indigo-400 mb-6" />
          <h3 className="text-2xl font-bold mb-4">Modo Estudo: Teoria na Prática</h3>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Não basta rodar o modelo. No Modo Estudo, explicamos cada etapa da pipeline: desde o pré-processamento até a validação final.
          </p>
          <button 
            onClick={() => onNavigate('learning')}
            className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all"
          >
            Acessar Trilhas
          </button>
        </div>
        
        {/* Decorative background circles */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default Home;
