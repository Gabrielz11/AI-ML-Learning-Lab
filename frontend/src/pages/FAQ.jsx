import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, BookOpen, Brain, Zap, Target, Database } from 'lucide-react';

const FAQItem = ({ question, answer, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-slate-800">{question}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{answer}</p>
      </div>
    </div>
  </motion.div>
);

const FAQ = () => {
  const faqs = [
    {
      icon: Zap,
      question: "Por que os resultados mudam a cada treinamento?",
      answer: "Toda vez que você clica em treinar, o sistema embaralha os dados reais de forma inédita. Isso garante que o modelo não 'decore' os exemplos, mas sim aprenda os padrões. Na ciência de dados, essa variabilidade é normal e ajuda a entender quão robusto o modelo realmente é."
    },
    {
      icon: Brain,
      question: "O que significa o 'Random' no Random Forest?",
      answer: "Não significa que ele 'chuta' o resultado! Significa que o algoritmo cria centenas de árvores de decisão diferentes, e cada uma recebe uma combinação aleatória de dados e características. O resultado final é a 'média' ou votação de todas essas árvores, o que torna o modelo extremamente resiliente."
    },
    {
      icon: Target,
      question: "Por que o Recall é tão importante na saúde?",
      answer: "O Recall mede a capacidade do modelo de não deixar passar nenhum caso positivo (como um tumor). Em medicina, é preferível ter um 'falso alarme' (que pode ser descartado em exames posteriores) do que ignorar um paciente doente que precisa de tratamento urgente."
    },
    {
      icon: BookOpen,
      question: "Qual a diferença entre MAE e RMSE?",
      answer: "O MAE dá uma média simples de erro (ex: 'erramos por 10 unidades'). Já o RMSE penaliza erros grandes de forma muito mais severa. Se o RMSE estiver muito alto, significa que o seu modelo está cometendo falhas críticas em alguns pacientes, mesmo que a média geral pareça boa."
    },
    {
      icon: MessageSquare,
      question: "O que é o R² (Coeficiente de Determinação)?",
      answer: "O R² compara a sua IA com um 'chute burro' (a média de todos os pacientes). Se o seu R² é 0.80, significa que sua IA é 80% melhor em explicar a variação dos dados do que se você estivesse apenas chutando a média para todo mundo."
    },
    {
      icon: Database,
      question: "De onde vem os dados que estão sendo usados?",
      answer: "O Nexus ML utiliza datasets científicos reais e renomados na comunidade de IA: o dataset de Câncer de Mama da UCI (Universidade da Califórnia em Irvine) para o módulo de classificação, e o dataset de Progressão de Diabetes da scikit-learn para o módulo de regressão. São dados reais de pacientes anonimizados usados em pesquisas médicas globais."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <HelpCircle size={14} /> Central de Conhecimento
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">Perguntas Frequentes (FAQ)</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Tudo o que você precisa saber sobre como a inteligência artificial do Nexus ML toma decisões e interpreta os dados.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>

      <footer className="card-container bg-indigo-600 text-white border-none p-8 text-center space-y-4">
        <h3 className="text-xl font-bold">Ainda tem dúvidas teóricas?</h3>
        <p className="opacity-80 text-sm max-w-xl mx-auto leading-relaxed">
          O Nexus ML é um laboratório vivo. Explore o <strong>Modo Estudo</strong> para ver visualizações interativas de como cada algoritmo 'pensa' passo a passo.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
            Ir para Modo Estudo
          </button>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
