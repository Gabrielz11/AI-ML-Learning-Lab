def explain_classification_metrics(metrics, model_name, lang="pt"):
    """
    Provides a deep pedagogical explanation of classification metrics and the confusion matrix.
    """
    acc = metrics["Accuracy"] * 100
    rec = metrics["Recall"] * 100
    pre = metrics["Precision"] * 100
    f1 = metrics["F1-score"] * 100
    cm = metrics.get("Confusion Matrix", [[0,0],[0,0]])
    
    # Extract CM values (assuming binary classification: 0=Benign, 1=Malignant)
    tn, fp, fn, tp = cm[0][0], cm[0][1], cm[1][0], cm[1][1]

    if lang == "pt":
        explanation = f"### 🚀 Diagnóstico do Modelo: **{model_name}**\n\n"
        explanation += f"O modelo alcançou uma **Acurácia de {acc:.1f}%**. Mas em diagnósticos de saúde, o segredo está nos detalhes:\n\n"
        
        explanation += "---\n\n"
        explanation += "#### 📊 A Anatomia da Decisão (Matriz de Confusão)\n"
        explanation += "Imagine que cada previsão é uma peça de um quebra-cabeça:\n\n"
        explanation += f"- ✅ **Acertos Precisos:** O modelo identificou corretamente **{tn}** casos benignos e **{tp}** casos malignos.\n"
        explanation += f"- ⚠️ **Alarme Falso (Falsos Positivos):** Em **{fp}** casos, a IA foi cautelosa demais e indicou risco onde não havia.\n"
        explanation += f"- 🚨 **O Perigo Oculto (Falsos Negativos):** Houve **{fn}** casos onde a IA falhou em detectar o tumor. **Este é o número que tentamos zerar.**\n\n"

        explanation += "---\n\n"
        explanation += "#### 🎯 Por que o Recall é o nosso Herói?\n"
        explanation += f"Seu **Recall de {rec:.1f}%** nos diz quão bem a IA 'varre' o hospital em busca de riscos. Preferimos um modelo que 'suspeite' de tudo (Alto Recall) do que um que ignore um problema real por excesso de confiança.\n\n"
        
        explanation += f"> **Conclusão:** Com um **F1-Score de {f1:.1f}%**, este modelo mostra um equilíbrio {'sólido' if f1 > 90 else 'em desenvolvimento'} entre ser preciso e ser abrangente."
        
    else:
        explanation = f"### 🚀 Model Diagnosis: **{model_name}**\n\n"
        explanation += f"The model achieved **{acc:.1f}% Accuracy**. However, in medical diagnostics, the truth lies in the details:\n\n"
        
        explanation += "---\n\n"
        explanation += "#### 📊 Decision Anatomy (Confusion Matrix)\n"
        explanation += "Think of every prediction as a piece of a puzzle:\n\n"
        explanation += f"- ✅ **Precise Hits:** The model correctly identified **{tn}** benign cases and **{tp}** malignant cases.\n"
        explanation += f"- ⚠️ **False Alarm (False Positives):** In **{fp}** cases, the AI was over-cautious, indicating risk where there was none.\n"
        explanation += f"- 🚨 **Hidden Danger (False Negatives):** There were **{fn}** cases where the AI failed to detect the tumor. **This is the number we strive to eliminate.**\n\n"

        explanation += "---\n\n"
        explanation += "#### 🎯 Why Recall is our Hero?\n"
        explanation += f"Your **Recall of {rec:.1f}%** tells us how well the AI 'scans' for risks. We prefer a model that 'suspects' everything (High Recall) over one that ignores a real problem due to overconfidence.\n\n"
        
        explanation += f"> **Verdict:** With an **F1-Score of {f1:.1f}%**, this model shows a {'solid' if f1 > 90 else 'developing'} balance between precision and coverage."
            
    return explanation

def explain_regression_metrics(metrics, model_name, lang="pt"):
    """
    Provides a deep pedagogical explanation of regression metrics, especially R2.
    """
    mae = metrics["MAE"]
    rmse = metrics["RMSE"]
    r2 = metrics["R2 Score"]
    
    if lang == "pt":
        explanation = f"### 📈 Inteligência de Predição: **{model_name}**\n\n"
        explanation += "Na regressão, não buscamos um 'Sim' ou 'Não', mas sim o quão perto chegamos do alvo real.\n\n"
        
        explanation += "---\n\n"
        explanation += "#### 📏 Entendendo o Erro (MAE vs RMSE)\n"
        explanation += f"- **Erro Médio (MAE): {mae:.2f}** units. Em média, nossas previsões 'erram' por este valor. É a nossa margem de incerteza cotidiana.\n"
        explanation += f"- **Penalidade Crítica (RMSE): {rmse:.2f}**. Esta métrica 'grita' quando o modelo comete erros muito grandes. Se o RMSE for muito maior que o MAE, a IA está tendo 'apagões' em casos específicos.\n\n"

        explanation += "---\n\n"
        explanation += "#### 🧠 O Poder de Explicação (R² Score)\n"
        explanation += f"Seu **R² é {r2:.2f}**. Pense nisso como o percentual de 'lógica' que a IA encontrou nos dados.\n\n"
        explanation += f"- 💡 **{r2*100:.1f}%** da variação da diabetes é explicada por este modelo.\n"
        explanation += f"- 🌪️ Os outros **{(1 - r2)*100:.1f}%** são causados por fatores imprevisíveis (caos, genética, ou dados faltantes).\n\n"
        
        if r2 > 0.7:
            explanation += "✅ **Veredito:** O modelo capturou o 'ritmo' dos dados com excelência. É uma base sólida para previsões clínicas.\n"
        else:
            explanation += "⚠️ **Veredito:** O modelo identifica a tendência, mas a diabetes é complexa. Precisamos de mais variáveis (como histórico familiar) para aumentar a confiança.\n"
            
    else:
        explanation = f"### 📈 Prediction Intelligence: **{model_name}**\n\n"
        explanation += "In regression, we don't look for 'Yes' or 'No', but for how close we get to the real target.\n\n"
        
        explanation += "---\n\n"
        explanation += "#### 📏 Understanding the Error (MAE vs RMSE)\n"
        explanation += f"- **Mean Error (MAE): {mae:.2f}**. On average, our predictions are 'off' by this value. It's our daily margin of uncertainty.\n"
        explanation += f"- **Critical Penalty (RMSE): {rmse:.2f}**. This metric 'screams' when the model makes very large errors. If RMSE is much higher than MAE, the AI is having 'blackouts' in specific cases.\n\n"

        explanation += "---\n\n"
        explanation += "#### 🧠 The Power of Explanation (R² Score)\n"
        explanation += f"Your **R² is {r2:.2f}**. Think of it as the percentage of 'logic' the AI found in the data.\n\n"
        explanation += f"- 💡 **{r2*100:.1f}%** of the diabetes variation is explained by this model.\n"
        explanation += f"- 🌪️ The remaining **{(1 - r2)*100:.1f}%** is caused by unpredictable factors (chaos, genetics, or missing data).\n\n"
            
    return explanation

def get_model_definition(model_name, lang="pt"):
    """
    Provides a layperson definition and analogy for each model.
    """
    definitions = {
        "pt": {
            "Logistic Regression": {
                "what": "Um modelo estatístico que calcula a probabilidade de algo pertencer a uma categoria (Sim ou Não).",
                "analogy": "Imagine um juiz de futebol decidindo se foi falta ou não baseado na velocidade do jogador e na distância do contato."
            },
            "Decision Tree": {
                "what": "Um modelo que cria uma sequência de perguntas (Sim/Não) para chegar a uma conclusão.",
                "analogy": "É como o jogo 'Adivinha Quem?', onde você pergunta: 'Tem chapéu?', 'Tem óculos?' até descobrir quem é o personagem."
            },
            "Random Forest": {
                "what": "Uma coleção de várias Árvores de Decisão que votam entre si para dar o resultado final.",
                "analogy": "É como pedir a opinião de 100 especialistas diferentes e seguir o que a maioria decidir."
            },
            "Linear Regression": {
                "what": "Um modelo que tenta encontrar a linha que melhor descreve a relação entre dois valores numéricos.",
                "analogy": "Imagine traçar uma linha de tendência: quanto maior a casa, maior o preço."
            },
            "Decision Tree Regressor": {
                "what": "Uma árvore de decisão, mas em vez de categorias, ela tenta chegar a um número final.",
                "analogy": "É como um avaliador de carros que faz perguntas para dar o preço final do veículo."
            }
        },
        "en": {
            "Logistic Regression": {
                "what": "A statistical model that calculates the probability of something belonging to a category (Yes or No).",
                "analogy": "Imagine a soccer referee deciding if it was a foul based on player speed and contact distance."
            },
            "Decision Tree": {
                "what": "A model that creates a sequence of Yes/No questions to reach a conclusion.",
                "analogy": "It's like the game 'Guess Who?', where you ask 'Do they have a hat?' until you find the character."
            },
            "Random Forest": {
                "what": "A collection of multiple Decision Trees that vote together for the final result.",
                "analogy": "It's like asking for the opinion of 100 different experts and following the majority decision."
            },
            "Linear Regression": {
                "what": "A model that tries to find the line that best describes the relationship between two numerical values.",
                "analogy": "Imagine drawing a trend line: the bigger the house, the higher the price."
            },
            "Decision Tree Regressor": {
                "what": "A decision tree, but instead of categories, it tries to reach a final number.",
                "analogy": "It's like a car appraiser who asks questions to give the final price of the vehicle."
            }
        }
    }
    lang_defs = definitions.get(lang, definitions["pt"])
    return lang_defs.get(model_name, {"what": "ML Model", "analogy": "N/A"})

def compare_models_explanation(results, task_type, lang="pt"):
    """
    Compares models and highlights the best one.
    """
    best_model = None
    if task_type == "classification":
        best_model = max(results, key=lambda x: results[x]["F1-score"])
        reason = "maior F1-score" if lang == "pt" else "highest F1-score"
    else:
        best_model = min(results, key=lambda x: results[x]["MAE"])
        reason = "menor erro médio (MAE)" if lang == "pt" else "lowest mean error (MAE)"
        
    if lang == "pt":
        explanation = f"### 🏆 Veredito da Comparação\n\n"
        explanation += f"O melhor modelo para este cenário foi o **{best_model}**, pois apresentou o {reason}.\n"
        if task_type == "classification":
            explanation += "\n*Dica Educacional: Em problemas de saúde, o Recall costuma ser mais importante que a Acurácia.*"
    else:
        explanation = f"### 🏆 Comparison Verdict\n\n"
        explanation += f"The best model for this scenario was **{best_model}**, as it showed the {reason}.\n"
        if task_type == "classification":
            explanation += "\n*Educational Tip: In healthcare problems, Recall is often more important than Accuracy.*"
    
    return explanation
