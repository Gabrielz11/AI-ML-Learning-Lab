# 🧠 PRD — ML Learning Lab (Plataforma de Aprendizado Hands-on em Machine Learning)

## 📌 1. Visão Geral

**Nome do Produto:** ML Learning Lab  
**Tipo:** Plataforma educacional interativa  
**Objetivo:** Ensinar Machine Learning de forma prática, guiada e explicada automaticamente

---

## 🎯 2. Objetivo do Produto

Criar uma aplicação que permita ao usuário:

- Aprender Machine Learning na prática
- Executar modelos reais com dados reais
- Entender cada etapa do processo automaticamente
- Comparar diferentes modelos de forma intuitiva

---

## 👤 3. Usuário Alvo

- Desenvolvedores iniciantes/intermediários
- Profissionais migrando para AI/ML
- Estudantes de tecnologia

---

## 🚨 4. Problema

Hoje, usuários que estudam Machine Learning:

- Entendem teoria, mas não prática
- Executam código sem entender o que está acontecendo
- Não sabem interpretar métricas
- Não sabem escolher o melhor modelo

---

## 💡 5. Solução

Uma plataforma que:

- Guia o usuário passo a passo
- Executa código automaticamente
- Explica resultados em linguagem simples
- Compara modelos de forma inteligente

---

## 🧩 6. Funcionalidades

### 🔹 6.1 Módulo de Classificação

#### Funcionalidades:
- Carregar dataset (ex: diabetes)
- Transformar problema em classificação binária
- Treinar modelos:
  - Logistic Regression
  - Decision Tree
  - Random Forest

#### Outputs:
- Matriz de confusão
- Precision
- Recall
- F1-score
- Accuracy

#### Explicação automática:
Exemplo:
> "O modelo acertou 74% dos casos e identificou 80% dos pacientes de risco."

---

### 🔹 6.2 Módulo de Regressão

#### Funcionalidades:
- Prever valores numéricos
- Treinar modelos:
  - Linear Regression
  - Decision Tree Regressor

#### Outputs:
- MAE
- RMSE
- R²

#### Explicação automática:
Exemplo:
> "O modelo erra em média 42 unidades."

---

### 🔹 6.3 Comparação de Modelos

#### Funcionalidades:
- Executar múltiplos modelos automaticamente
- Comparar métricas entre modelos

#### Output:
| Modelo | Accuracy | Recall | F1 |
|--------|---------|--------|----|

#### Explicação:
> "O modelo X teve melhor recall, sendo mais indicado para cenários de risco."

---

### 🔹 6.4 Interpretação Inteligente (Core Feature)

O sistema deve explicar automaticamente:

- Se o modelo está bom ou ruim
- Se há overfitting ou underfitting
- Qual métrica é mais relevante para o problema
- Trade-offs entre modelos

---

### 🔹 6.5 Pipeline Visual

Representação do fluxo:
Dados → Treino → Teste → Métricas → Interpretação


---

### 🔹 6.6 Modo Educacional (Diferencial)

Para cada etapa, o sistema deve mostrar:

- O que está acontecendo
- Por que isso importa
- Exemplo do mundo real

Exemplo:
> "Dividimos os dados em treino e teste para evitar que o modelo 'decore' as respostas."

---

## 🧱 7. Arquitetura

### Backend
- Python
- FastAPI

### Engine de Machine Learning
- scikit-learn

### Frontend (MVP)
- Streamlit (prioritário)

### Futuro
- React (dashboard mais avançado)

---

## 📦 8. Estrutura do Projeto
ml-learning-lab/
│
├── app.py
├── modules/
│ ├── classification.py
│ ├── regression.py
│ ├── evaluation.py
│ ├── explanation.py
│
├── services/
│ ├── data_loader.py
│ ├── model_trainer.py
│
├── utils/
│ ├── metrics_helper.py
│
└── README.md


---

## 🔄 9. Fluxo do Sistema

1. Usuário escolhe:
   - Classificação ou Regressão

2. Sistema:
   - Carrega dataset
   - Divide treino/teste
   - Treina múltiplos modelos

3. Sistema exibe:
   - Métricas
   - Comparação entre modelos
   - Explicações automáticas

---

## 🧠 10. Regras de Negócio

- Sempre separar dados em treino/teste
- Sempre mostrar métricas
- Sempre explicar resultados
- Sempre comparar pelo menos 2 modelos
- Sempre traduzir métricas para linguagem humana

---

## 📊 11. Métricas de Sucesso do Produto

O usuário deve ser capaz de:

- Entender diferença entre classificação e regressão
- Interpretar métricas como:
  - Precision
  - Recall
  - F1-score
- Escolher o modelo adequado para o problema

---

## 🚀 12. Roadmap (Sugestão)

### Fase 1 (MVP)
- Classificação
- Regressão
- Métricas básicas
- Interface com Streamlit

### Fase 2
- Comparação automática de modelos
- Explicações inteligentes

### Fase 3
- Pipeline visual
- Upload de datasets
- Dashboard avançado (React)

---

## 🧠 13. Diferencial Estratégico

- Ensino prático + automático
- Explicação em linguagem simples
- Foco em aprendizado real (não só código)

---

## 📌 14. Futuras Expansões

- Integração com LLM para explicações mais avançadas
- AutoML básico
- Recomendação automática de modelo
- Gamificação (trilhas de aprendizado)

---