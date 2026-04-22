export const content = {
  pt: {
    sidebar: {
      title: "Nexus ML",
      dashboard: "Painel de Controle",
      classification: "Classificação",
      regression: "Regressão",
      curriculum: "Trilha de Estudo",
      settings: "Configurações"
    },
    dashboard: {
      welcome: "Bem-vindo, ",
      subtitle: "Sua jornada no universo de Machine Learning começa aqui.",
      stats: {
        accuracy: "Acurácia Média",
        models: "Modelos Treinados",
        compute: "Tempo de Processamento"
      },
      recent: "Experimentos Recentes",
      path: "Sua Trilha de Aprendizado"
    },
    classification: {
      title: "Motor de Classificação",
      subtitle: "Ensine a máquina a distinguir entre categorias (Ex: Maligno vs Benigno).",
      datasetInfo: "Estamos usando o dataset **Breast Cancer Diagnostic**. O objetivo é prever se um tumor é maligno ou benigno com base em características clínicas.",
      learnMore: {
        training: {
          title: "🤔 O que é 'Treinar'?",
          text: "Treinar é como mostrar um livro de exercícios com as respostas para um aluno. O modelo tenta encontrar padrões nessas respostas para que, quando ele vir um exercício novo (Teste), ele saiba resolver sozinho."
        },
        split: {
          title: "📖 Por que dividir os dados?",
          text: "Dividimos os dados em Treino (80%) e Teste (20%). Isso evita que a IA 'decore' os dados. Testamos em dados nunca vistos para garantir que ela realmente aprendeu a generalizar."
        }
      },
      metrics: {
        accuracy: {
          label: "Acurácia",
          hint: "Porcentagem total de acertos. Cuidado: pode enganar em dados desequilibrados!"
        },
        recall: {
          label: "Recall (Sensibilidade)",
          hint: "Capacidade de não deixar passar casos positivos. Crucial em diagnósticos médicos!"
        },
        precision: {
          label: "Precisão",
          hint: "Capacidade de não dar falsos alarmes quando diz que algo é positivo."
        },
        f1: {
          label: "F1-Score",
          hint: "A média harmônica entre Precisão e Recall. O equilíbrio perfeito."
        }
      }
    },
    simulator: {
      title: "Simulador Interativo",
      subtitle: "Teste sua IA com dados reais do mundo real.",
      button: "Fazer Previsão",
      help: "O simulador leva sua IA do laboratório para a vida real. Insira os valores para ver a decisão do modelo."
    }
  }
};
