import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Database, Cpu, Play, CheckCircle2, BookOpen } from 'lucide-react';

const Step = ({ number, title, icon: Icon, children, isOpen, onToggle }) => (
  <div className={`card-container p-0 overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-primary/20' : ''}`}>
    <button 
      onClick={onToggle}
      className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isOpen ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
        {number}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <Icon size={18} className={isOpen ? 'text-primary' : 'text-muted-foreground'} />
        <h4 className="font-bold text-slate-800">{title}</h4>
      </div>
      <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      className="overflow-hidden bg-slate-50/30"
    >
      <div className="p-6 border-t border-border text-sm leading-relaxed text-slate-600 space-y-4">
        {children}
      </div>
    </motion.div>
  </div>
);

const LearningMode = () => {
  const [openStep, setOpenStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase">
          <BookOpen size={14} /> Trilha de Aprendizado
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">Pipeline de Machine Learning</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Entenda os bastidores de como uma IA é construída, do dado bruto à decisão final.
        </p>
      </div>

      <div className="space-y-4">
        <Step 
          number="1" 
          title="Coleta e Limpeza de Dados" 
          icon={Database}
          isOpen={openStep === 1}
          onToggle={() => setOpenStep(openStep === 1 ? null : 1)}
        >
          <p>Tudo começa com os dados. Imagine que estamos ensinando um robô a identificar frutas. Precisamos de fotos de maçãs, laranjas e bananas.</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><span className="font-bold text-slate-800">Normalização:</span> Colocar todos os números na mesma escala (ex: 0 a 1).</li>
            <li><span className="font-bold text-slate-800">Tratamento de Nulos:</span> O que fazer quando falta informação?</li>
          </ul>
        </Step>

        <Step 
          number="2" 
          title="Divisão Treino / Teste" 
          icon={CheckCircle2}
          isOpen={openStep === 2}
          onToggle={() => setOpenStep(openStep === 2 ? null : 2)}
        >
          <p>Não podemos usar todos os dados para treinar. Se fizermos isso, o modelo pode simplesmente "decorar" as respostas.</p>
          <div className="p-4 bg-white rounded-xl border border-border mt-4 flex items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>Treino (80%)</span>
                <span>80 instâncias</span>
              </div>
              <div className="h-2 bg-indigo-500 rounded-full"></div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                <span>Teste (20%)</span>
                <span>20 instâncias</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 italic">Usamos o teste para avaliar como o modelo se comporta com dados que ele nunca viu antes.</p>
        </Step>

        <Step 
          number="3" 
          title="O Treinamento" 
          icon={Cpu}
          isOpen={openStep === 3}
          onToggle={() => setOpenStep(openStep === 3 ? null : 3)}
        >
          <p>É aqui que a mágica matemática acontece. O algoritmo tenta encontrar padrões (pesos) que minimizem o erro das previsões.</p>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 p-4 bg-white rounded-xl border border-indigo-100 flex flex-col items-center gap-2">
              <Cpu size={24} className="text-indigo-500" />
              <span className="text-xs font-bold">Algoritmo</span>
            </div>
            <div className="flex items-center text-indigo-300">
              <Play size={20} />
            </div>
            <div className="flex-1 p-4 bg-indigo-600 rounded-xl flex flex-col items-center gap-2 text-white shadow-lg shadow-indigo-200">
              <div className="w-6 h-6 rounded-full border-2 border-white/50 animate-pulse"></div>
              <span className="text-xs font-bold text-white">Modelo Treinado</span>
            </div>
          </div>
        </Step>

        <Step 
          number="4" 
          title="Avaliação Final" 
          icon={Play}
          isOpen={openStep === 4}
          onToggle={() => setOpenStep(openStep === 4 ? null : 4)}
        >
          <p>Por fim, comparamos as previsões do modelo com as respostas reais do grupo de Teste.</p>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 mt-4">
            <h5 className="font-bold mb-1">Métricas de Sucesso:</h5>
            <p className="text-xs opacity-80 italic">"Se o modelo acertou 19 de 20 casos, temos 95% de acurácia."</p>
          </div>
        </Step>
      </div>
    </div>
  );
};

export default LearningMode;
