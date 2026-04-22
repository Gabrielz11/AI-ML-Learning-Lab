import pandas as pd
from sklearn.datasets import load_breast_cancer, load_diabetes
from sklearn.model_selection import train_test_split

def load_classification_data():
    """
    Loads the breast cancer dataset for classification tasks.
    Returns: X_train, X_test, y_train, y_test, feature_names, target_names
    """
    data = load_breast_cancer()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    return X_train, X_test, y_train, y_test, data.feature_names, data.target_names

def get_classification_metadata(lang="pt"):
    """
    Returns a description of the features in the breast cancer dataset.
    """
    meta = {
        "pt": {
            "mean radius": "Raio médio do tumor (distância do centro aos pontos no perímetro).",
            "mean texture": "Desvio padrão dos valores da escala de cinza na imagem.",
            "mean perimeter": "Tamanho do perímetro médio do tumor.",
            "mean area": "Área média do tumor.",
            "mean smoothness": "Variação local no comprimento dos raios.",
            "mean compactness": "Perímetro^2 / área - 1.0 (nível de densidade).",
            "mean concavity": "Severidade das porções côncavas do contorno.",
            "mean concave points": "Número de porções côncavas do contorno.",
            "mean symmetry": "Simetria do formato do tumor.",
            "mean fractal dimension": "Aproximação da linha costeira - 1 (complexidade do contorno)."
        },
        "en": {
            "mean radius": "Mean radius of the tumor (distance from center to perimeter points).",
            "mean texture": "Standard deviation of gray-scale values in the image.",
            "mean perimeter": "Mean size of the tumor perimeter.",
            "mean area": "Mean tumor area.",
            "mean smoothness": "Local variation in radius lengths.",
            "mean compactness": "Perimeter^2 / area - 1.0 (density level).",
            "mean concavity": "Severity of concave portions of the contour.",
            "mean concave points": "Number of concave portions of the contour.",
            "mean symmetry": "Symmetry of the tumor shape.",
            "mean fractal dimension": "Coastline approximation - 1 (contour complexity)."
        }
    }
    return meta.get(lang, meta["pt"])

def load_regression_data():
    """
    Loads the diabetes dataset for regression tasks.
    Returns: X_train, X_test, y_train, y_test, feature_names
    """
    data = load_diabetes()
    X = pd.DataFrame(data.data, columns=data.feature_names)
    y = data.target
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    return X_train, X_test, y_train, y_test, data.feature_names

def get_regression_metadata(lang="pt"):
    """
    Returns a description of the features in the diabetes dataset.
    """
    meta = {
        "pt": {
            "age": "Idade em anos.",
            "sex": "Gênero do paciente.",
            "bmi": "Índice de Massa Corporal (IMC).",
            "bp": "Pressão sanguínea média.",
            "s1": "tc, colesterol total no sangue.",
            "s2": "ldl, lipoproteínas de baixa densidade.",
            "s3": "hdl, lipoproteínas de alta densidade.",
            "s4": "tch, colesterol total / HDL.",
            "s5": "ltg, logaritmo do nível de triglicérides no soro.",
            "s6": "glu, nível de açúcar no sangue."
        },
        "en": {
            "age": "Age in years.",
            "sex": "Gender of the patient.",
            "bmi": "Body Mass Index (BMI).",
            "bp": "Mean blood pressure.",
            "s1": "tc, total serum cholesterol.",
            "s2": "ldl, low-density lipoproteins.",
            "s3": "hdl, high-density lipoproteins.",
            "s4": "tch, total cholesterol / HDL.",
            "s5": "ltg, log of serum triglycerides level.",
            "s6": "glu, blood sugar level."
        }
    }
    return meta.get(lang, meta["pt"])
