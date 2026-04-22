from utils.metrics_helper import get_classification_metrics, get_regression_metrics

def evaluate_model(model, X_test, y_test, task_type):
    """
    Evaluates a trained model and returns metrics.
    """
    y_pred = model.predict(X_test)
    
    if task_type == "classification":
        return get_classification_metrics(y_test, y_pred)
    else:
        return get_regression_metrics(y_test, y_pred)
