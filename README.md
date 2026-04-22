# Nexus ML - Learning Lab 🧠

Uma plataforma educacional moderna para o aprendizado prático de Machine Learning, focada em visualização de dados e interpretação de métricas.

## 🚀 Arquitetura do Projeto

O projeto é dividido em duas partes principais:
1. **Frontend (React)**: Uma interface SaaS de alta performance construída com React, Tailwind CSS 4 e Framer Motion.
2. **Backend (FastAPI)**: Uma API robusta em Python que processa os pipelines de Machine Learning usando Scikit-Learn.

---

## 🛠️ Como Iniciar

### 1. Backend (API Python)
Certifique-se de ter o Python instalado.

```powershell
# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor
python main.py
```
O servidor estará rodando em: `http://localhost:8000`

### 2. Frontend (React)
Navegue até a pasta frontend.

```powershell
cd frontend

# Instale as dependências (caso não tenha feito)
npm install

# Inicie o ambiente de desenvolvimento
npm run dev
```
Acesse a plataforma em: `http://localhost:5173` (ou 5174)

---

## 📂 Estrutura de Pastas

```text
/
├── frontend/           # Interface React + Tailwind
│   ├── src/pages/      # Páginas (Classificação, Regressão, etc)
│   └── src/components/ # Componentes reutilizáveis
├── modules/            # Pipelines de ML (Classificação/Regressão)
├── services/           # Lógica de treino e carregamento de dados
├── utils/              # Funções utilitárias e i18n
├── main.py             # Servidor Backend FastAPI
└── requirements.txt    # Dependências Python
```

## 🧪 Funcionalidades
- **Simulador Interativo**: Teste dados reais e receba explicações dinâmicas da IA.
- **Visualização de Dados**: Gráficos de dispersão e barras para análise de performance.
- **Modo Estudo**: Aprenda os conceitos por trás de cada etapa da pipeline de dados.

---
Desenvolvido com ❤️ por Antigravity.
