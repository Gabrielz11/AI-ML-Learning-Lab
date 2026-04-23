from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np

# Import existing logic
from modules.classification import run_classification_pipeline
from modules.regression import run_regression_pipeline
from services.data_loader import get_classification_metadata, get_regression_metadata

app = FastAPI(title="Nexus ML API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExperimentRequest(BaseModel):
    task_type: str # 'classification' or 'regression'
    models: List[str]
    lang: str = "en"

@app.get("/")
async def root():
    return {"message": "Nexus ML Engine is running"}

@app.post("/run-experiment")
async def execute_experiment(request: ExperimentRequest):
    try:
        if request.task_type == "classification":
            results, _, _, _, _, _, _, comparison = run_classification_pipeline(request.models, lang=request.lang)
            # Prepare serializable results
            serializable_results = {}
            for name, data in results.items():
                metrics = data["metrics"]
                # Convert confusion matrix to list for JSON serialization
                if "Confusion Matrix" in metrics:
                    metrics["Confusion Matrix"] = metrics["Confusion Matrix"].tolist()
                
                serializable_results[name] = {
                    "metrics": metrics,
                    "explanation": data["explanation"]
                }
            return {
                "results": serializable_results,
                "comparison": comparison
            }
            
        elif request.task_type == "regression":
            results, _, _, _, _, _, comparison = run_regression_pipeline(request.models, lang=request.lang)
            # Prepare serializable results
            serializable_results = {}
            for name, data in results.items():
                serializable_results[name] = {
                    "metrics": data["metrics"],
                    "explanation": data["explanation"]
                }
            return {
                "results": serializable_results,
                "comparison": comparison
            }
            
        else:
            raise HTTPException(status_code=400, detail="Invalid task type")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metadata/{task_type}")
async def get_meta(task_type: str, lang: str = "en"):
    if task_type == "classification":
        return get_classification_metadata(lang=lang)
    elif task_type == "regression":
        return get_regression_metadata(lang=lang)
    return {}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
