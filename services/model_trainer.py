from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.ensemble import RandomForestClassifier

def train_classification_model(model_type, X_train, y_train):
    """
    Trains a classification model based on the specified type.
    """
    if model_type == "Logistic Regression":
        model = LogisticRegression(max_iter=1000)
    elif model_type == "Decision Tree":
        model = DecisionTreeClassifier(random_state=42)
    elif model_type == "Random Forest":
        model = RandomForestClassifier(random_state=42)
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model.fit(X_train, y_train)
    return model

def train_regression_model(model_type, X_train, y_train):
    """
    Trains a regression model based on the specified type.
    """
    if model_type == "Linear Regression":
        model = LinearRegression()
    elif model_type == "Decision Tree Regressor":
        model = DecisionTreeRegressor(random_state=42)
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model.fit(X_train, y_train)
    return model
