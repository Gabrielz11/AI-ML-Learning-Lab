def explain_classification_metrics(metrics, model_name, lang="pt"):
    """
    Provides a human-readable explanation of classification metrics.
    """
    acc = metrics["Accuracy"] * 100
    rec = metrics["Recall"] * 100
    pre = metrics["Precision"] * 100
    
    if lang == "pt":
        explanation = f"### 💡 Explicação dos Resultados ({model_name})\n\n"
        explanation += f"- **Acurácia ({acc:.1f}%):** Significa que o modelo acertou {acc:.1f} de cada 100 casos no total.\n"
        explanation += f"- **Recall ({rec:.1f}%):** Indica que o modelo conseguiu identificar {rec:.1f}% de todos os casos positivos reais.\n"
        explanation += f"- **Precisão ({pre:.1f}%):** Quando o modelo diz que é positivo, ele acerta em {pre:.1f}% das vezes.\n\n"
        
        if acc > 85:
            explanation += "✅ **Desempenho:** O modelo está com um excelente desempenho geral.\n"
        elif acc > 70:
            explanation += "⚠️ **Desempenho:** O modelo é razoável, mas pode ser melhorado.\n"
        else:
            explanation += "❌ **Desempenho:** O modelo está errando muito.\n"
    else:
        explanation = f"### 💡 Results Explanation ({model_name})\n\n"
        explanation += f"- **Accuracy ({acc:.1f}%):** Means the model got {acc:.1f} out of 100 cases correct overall.\n"
        explanation += f"- **Recall ({rec:.1f}%):** Indicates the model identified {rec:.1f}% of all actual positive cases.\n"
        explanation += f"- **Precision ({pre:.1f}%):** When the model says it's positive, it is correct {pre:.1f}% of the time.\n\n"
        
        if acc > 85:
            explanation += "✅ **Performance:** The model has excellent overall performance.\n"
        elif acc > 70:
            explanation += "⚠️ **Performance:** The model is reasonable but can be improved.\n"
        else:
            explanation += "❌ **Performance:** The model is making many mistakes.\n"
            
    return explanation

def explain_regression_metrics(metrics, model_name, lang="pt"):
    """
    Provides a human-readable explanation of regression metrics.
    """
    mae = metrics["MAE"]
    r2 = metrics["R2 Score"]
    
    if lang == "pt":
        explanation = f"### 💡 Explicação dos Resultados ({model_name})\n\n"
        explanation += f"- **MAE ({mae:.2f}):** Em média, as previsões do modelo erram por {mae:.2f} unidades.\n"
        explanation += f"- **R² Score ({r2:.2f}):** O modelo explica {(r2*100):.1f}% da variação dos dados.\n\n"
        
        if r2 > 0.7:
            explanation += "✅ **Desempenho:** O modelo tem um bom ajuste aos dados.\n"
        elif r2 > 0.4:
            explanation += "⚠️ **Desempenho:** O modelo captura algumas tendências, mas ainda tem muito erro.\n"
        else:
            explanation += "❌ **Desempenho:** O modelo não está conseguindo aprender a relação.\n"
    else:
        explanation = f"### 💡 Results Explanation ({model_name})\n\n"
        explanation += f"- **MAE ({mae:.2f}):** On average, the model's predictions are off by {mae:.2f} units.\n"
        explanation += f"- **R² Score ({r2:.2f}):** The model explains {(r2*100):.1f}% of the data variation.\n\n"
        
        if r2 > 0.7:
            explanation += "✅ **Performance:** The model has a good fit to the data.\n"
        elif r2 > 0.4:
            explanation += "⚠️ **Performance:** The model captures some trends but still has significant error.\n"
        else:
            explanation += "❌ **Performance:** The model is failing to learn the relationship.\n"
            
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
