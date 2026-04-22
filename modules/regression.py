from services.data_loader import load_regression_data
from services.model_trainer import train_regression_model
from modules.evaluation import evaluate_model
from modules.explanation import explain_regression_metrics

def run_regression_pipeline(model_list, lang="pt"):
    """
    Runs the full regression pipeline for a list of models.
    """
    X_train, X_test, y_train, y_test, features = load_regression_data()
    
    results = {}
    for model_name in model_list:
        model = train_regression_model(model_name, X_train, y_train)
        metrics = evaluate_model(model, X_test, y_test, "regression")
        explanation = explain_regression_metrics(metrics, model_name, lang=lang)
        
        results[model_name] = {
            "metrics": metrics,
            "explanation": explanation,
            "model": model
        }
        
    return results, X_train, X_test, y_train, y_test, features
