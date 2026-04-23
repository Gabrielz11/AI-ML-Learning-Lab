import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Database, Cpu, Play, CheckCircle2, BookOpen, Brain, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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
      <div className="p-6 border-t border-border text-sm leading-relaxed text-slate-600 space-y-4 markdown-content">
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
          title="Avaliação e Métricas" 
          icon={Play}
          isOpen={openStep === 4}
          onToggle={() => setOpenStep(openStep === 4 ? null : 4)}
        >
          <ReactMarkdown>Métricas como **Acurácia, Recall e R²** são os KPIs (indicadores-chave) do projeto. Elas dizem se o modelo está pronto para produção ou se precisa de ajustes.</ReactMarkdown>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 mt-4">
            <h5 className="font-bold mb-1">KPIs de Performance:</h5>
            <p className="text-xs opacity-80 italic">"Modelos médicos exigem Recall &gt; 95% para garantir a segurança dos pacientes."</p>
          </div>
        </Step>

        <Step 
          number="5" 
          title="Interpretabilidade (XAI)" 
          icon={Brain}
          isOpen={openStep === 5}
          onToggle={() => setOpenStep(openStep === 5 ? null : 5)}
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
              Nível Profissional
            </div>
            <ReactMarkdown>Empresas como Google e Amazon não aceitam mais modelos **"Caixa Preta"**. Elas usam **Explainable AI (XAI)** para entender o "porquê" de cada decisão.</ReactMarkdown>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <h6 className="font-bold text-xs text-slate-800 mb-2">SHAP & LIME</h6>
                <p className="text-[11px] text-slate-500">Ferramentas que medem o impacto exato de cada variável na decisão final da IA.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <h6 className="font-bold text-xs text-slate-800 mb-2">Ética & Viés</h6>
                <p className="text-[11px] text-slate-500">Garantir que a IA não tome decisões baseadas em preconceitos ou dados viciados.</p>
              </div>
            </div>
            
            <p className="pt-2 italic border-t border-slate-100 text-slate-500">No Nexus ML, nossas análises pedagógicas automatizadas são o primeiro passo para você dominar a transparência de modelos.</p>
          </div>
        </Step>
      </div>

      <section className="card-container bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-none p-10 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-xl flex items-center justify-center border border-white/10">
              <GraduationCap className="text-indigo-400" size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">O Futuro é a IA Explicável</h3>
              <p className="text-indigo-200/60 text-sm">Próximos passos para sua carreira em Dados</p>
            </div>
          </div>
          
          <ReactMarkdown 
            components={{
              p: ({node, ...props}) => <p className="text-indigo-100/80 leading-relaxed text-sm max-w-2xl" {...props} />
            }}
          >
            Aprender a treinar um modelo é o básico. O diferencial profissional hoje é saber **justificar** a decisão da IA para os stakeholders e garantir que ela seja ética e justa. Domine as métricas que você viu aqui e você estará à frente de 90% do mercado.
          </ReactMarkdown>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
};

export default LearningMode;
