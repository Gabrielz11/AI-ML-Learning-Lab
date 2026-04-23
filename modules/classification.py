from services.data_loader import load_classification_data
from services.model_trainer import train_classification_model
from modules.evaluation import evaluate_model
from modules.explanation import explain_classification_metrics, compare_models_explanation

def run_classification_pipeline(model_list, lang="pt"):
    """
    Runs the full classification pipeline for a list of models.
    """
    X_train, X_test, y_train, y_test, features, targets = load_classification_data()
    
    results = {}
    for model_name in model_list:
        model = train_classification_model(model_name, X_train, y_train)
        metrics = evaluate_model(model, X_test, y_test, "classification")
        explanation = explain_classification_metrics(metrics, model_name, lang=lang)
        
        results[model_name] = {
            "metrics": metrics,
            "explanation": explanation,
            "model": model
        }
    
    comparison = compare_models_explanation(results, "classification", lang=lang)
    return results, X_train, X_test, y_train, y_test, features, targets, comparison
