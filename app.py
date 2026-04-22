import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
from modules.classification import run_classification_pipeline
from modules.regression import run_regression_pipeline
from modules.explanation import compare_models_explanation, get_model_definition
from services.data_loader import get_classification_metadata, get_regression_metadata
from utils.i18n import get_text

# Page config
st.set_page_config(
    page_title="ML Learning Lab",
    page_icon="🧠",
    layout="wide"
)

# Custom CSS
st.markdown("""
    <style>
    .metric-card { 
        padding: 1.5rem; 
        border-radius: 12px; 
        border: 1px solid rgba(128, 128, 128, 0.2);
        margin-bottom: 1rem;
    }
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        height: 3.5em;
        background: #4CAF50;
        color: white !important;
        font-weight: bold;
        border: none;
        transition: 0.3s;
    }
    .stButton>button:hover {
        background: #45a049;
    }
    </style>
    """, unsafe_allow_html=True)

# Sidebar
st.sidebar.title(get_text("title"))

# Language Selector
lang_options = {"Português": "pt", "English": "en"}
selected_lang_name = st.sidebar.selectbox("🌐 Language / Idioma:", list(lang_options.keys()))
lang = lang_options[selected_lang_name]

st.sidebar.divider()
task_type_display = st.sidebar.radio(
    get_text("select_problem", lang), 
    [get_text("classification", lang), get_text("regression", lang)]
)
task_type = "Classificação" if task_type_display == get_text("classification", lang) else "Regressão"

st.sidebar.divider()
st.sidebar.info(get_text("sidebar_info", lang))
st.sidebar.markdown(get_text("process_flow", lang))
st.sidebar.code("Data ➔ Train ➔ Test ➔ Metrics ➔ Explanation" if lang=="en" else "Dados ➔ Treino ➔ Teste ➔ Métricas ➔ Explicação", language=None)

st.sidebar.divider()
with st.sidebar.expander(get_text("what_is_training", lang)):
    st.write(get_text("training_explanation", lang))

# Main Title Section
st.title(get_text("welcome", lang))
st.markdown(f"*{get_text('subtitle', lang)}*")
st.divider()

# Session State Initialization
if "clf_results" not in st.session_state:
    st.session_state.clf_results = None
if "reg_results" not in st.session_state:
    st.session_state.reg_results = None

if task_type == "Classificação":
    st.header(get_text("classification_header", lang))
    st.info("""
    **Dataset:** Breast Cancer Diagnostic (Binary Classification).  
    **Goal:** Predict if a tumor is Malignant or Benign.
    """ if lang=="en" else """
    **Dataset:** Diagnóstico de Câncer de Mama (Binary Classification).  
    **Objetivo:** Prever se um tumor é Maligno ou Benigno com base em características clínicas.
    """)
    
    with st.expander(get_text("explore_dataset", lang)):
        # Load sample without full pipeline
        from services.data_loader import load_classification_data
        X_train_s, _, _, _, features, _ = load_classification_data()
        st.write(get_text("data_sample", lang))
        st.dataframe(X_train_s.head(5), use_container_width=True)
        st.write(get_text("data_dict", lang))
        meta = get_classification_metadata(lang=lang)
        cols = st.columns(2)
        for i, (col, desc) in enumerate(meta.items()):
            cols[i%2].markdown(f"- **{col}**: {desc}")
            
        st.write(f"*{get_text('source_label', lang)} {get_text('source_desc_clf', lang)}*")

    st.subheader(get_text("config", lang))
    col_c1, col_c2 = st.columns([2, 1])
    with col_c1:
        models_to_run = st.multiselect(
            get_text("choose_models", lang),
            ["Logistic Regression", "Decision Tree", "Random Forest"],
            default=["Logistic Regression", "Decision Tree"]
        )
    with col_c2:
        st.write(" ") # Spacer
        st.write(" ") # Spacer
        if st.button(get_text("run_experiment", lang)):
            with st.spinner("Processing..." if lang=="en" else "Processando..."):
                results, X_train, X_test, y_train, y_test, features, targets = run_classification_pipeline(models_to_run, lang=lang)
                st.session_state.clf_results = {
                    "results": results, "X_train": X_train, "X_test": X_test, 
                    "y_train": y_train, "y_test": y_test, "models_to_run": models_to_run
                }

    if st.session_state.clf_results:
        res_data = st.session_state.clf_results
        results = res_data["results"]
        X_train = res_data["X_train"]
        X_test = res_data["X_test"]
        
        st.success(get_text("training_success", lang))
        
        # Metrics Dashboard
        st.subheader(get_text("metrics_comparison", lang))
        best_model_name = max(results, key=lambda x: results[x]["metrics"]["F1-score"])
        best_metrics = results[best_model_name]["metrics"]
        
        m1, m2, m3, m4 = st.columns(4)
        m1.metric("Accuracy", f"{best_metrics['Accuracy']*100:.1f}%")
        m2.metric("Precision", f"{best_metrics['Precision']*100:.1f}%")
        m3.metric("Recall", f"{best_metrics['Recall']*100:.1f}%")
        m4.metric("F1-Score", f"{best_metrics['F1-score']*100:.1f}%")
        
        with st.expander(get_text("why_split", lang)):
            st.write(get_text("split_explanation", lang))
        
        comparison_data = []
        for name, res in results.items():
            metrics = res["metrics"]
            comparison_data.append({
                "Model": name,
                "Accuracy": f"{metrics['Accuracy']:.3f}",
                "Precision": f"{metrics['Precision']:.3f}",
                "Recall": f"{metrics['Recall']:.3f}",
                "F1-Score": f"{metrics['F1-score']:.3f}"
            })
        st.table(pd.DataFrame(comparison_data))
        
        if len(res_data["models_to_run"]) > 1:
            verdict = compare_models_explanation({k: v["metrics"] for k, v in results.items()}, "classification", lang=lang)
            st.markdown(verdict)
        
        st.divider()
        st.subheader(get_text("detailed_analysis", lang))
        tabs = st.tabs(res_data["models_to_run"])
        for i, model_name in enumerate(res_data["models_to_run"]):
            with tabs[i]:
                res = results[model_name]
                defn = get_model_definition(model_name, lang=lang)
                t_col1, t_col2 = st.columns([1, 1])
                with t_col1:
                    st.info(f"{get_text('what_is_it', lang)} {defn['what']}\n\n{get_text('analogy', lang)} {defn['analogy']}")
                    st.markdown(res["explanation"])
                with t_col2:
                    if hasattr(res["model"], "feature_importances_"):
                        st.markdown(f"#### {get_text('importance_title_clf', lang)}")
                        importances = res["model"].feature_importances_
                        feat_df = pd.DataFrame({'Feature': X_train.columns, 'Importance': importances})
                        feat_df = feat_df.sort_values(by='Importance', ascending=False).head(5)
                        fig_feat, ax_feat = plt.subplots(figsize=(4, 2.5))
                        sns.barplot(x='Importance', y='Feature', data=feat_df, palette='viridis', ax=ax_feat, hue='Feature', legend=False)
                        ax_feat.tick_params(labelsize=6)
                        ax_feat.set_xlabel('Importance' if lang=="en" else 'Importância', fontsize=7)
                        ax_feat.set_ylabel('', fontsize=7)
                        st.pyplot(fig_feat)
                st.divider()
                c_col1, c_col2 = st.columns([1, 1])
                with c_col1:
                    fig, ax = plt.subplots(figsize=(3, 2))
                    sns.heatmap(res["metrics"]["Confusion Matrix"], annot=True, fmt='d', cmap='Blues', ax=ax, cbar=False)
                    ax.set_xlabel('Predicted' if lang=="en" else 'Previsão', fontsize=8)
                    ax.set_ylabel('Actual' if lang=="en" else 'Real', fontsize=8)
                    ax.set_title(get_text("confusion_matrix", lang), fontsize=10)
                    st.pyplot(fig)
                with c_col2:
                    with st.expander(get_text("what_is_cm", lang)):
                        st.write(get_text("cm_explanation", lang))

        # Simulator
        st.divider()
        st.header(get_text("simulator_title", lang))
        st.write(get_text("simulator_desc", lang))
        with st.expander("❓ " + get_text("how_to_read_reg", lang) if lang=="en" else "❓ O que é isso?"):
            st.write(get_text("simulator_help", lang))
        
        sim_cols = st.columns(3)
        input_data = {}
        top_feats = ["mean radius", "mean texture", "mean area"]
        for i, feat in enumerate(top_feats):
            val = sim_cols[i%3].number_input(f"{feat}", value=float(X_train[feat].mean()), key=f"sim_clf_{feat}")
            input_data[feat] = val
        
        if st.button(get_text("predict_btn", lang), key="btn_sim_clf"):
            full_input = {col: X_train[col].mean() for col in X_train.columns}
            full_input.update(input_data)
            input_df = pd.DataFrame([full_input])
            best_model = results[best_model_name]["model"]
            pred = best_model.predict(input_df)[0]
            st.subheader(get_text("result_label", lang))
            if pred == 1: st.success(get_text("benign", lang))
            else: st.error(get_text("malignant", lang))

else:
    st.header(get_text("regression_header", lang))
    st.info("""
    **Dataset:** Diabetes progression.  
    **Goal:** Predict a numerical value (disease progression index).
    """ if lang=="en" else """
    **Dataset:** Diabetes (Progressão da doença).  
    **Objetivo:** Prever um valor numérico (índice quantitativo da progressão da doença) após um ano.
    """)
    
    with st.expander(get_text("explore_dataset", lang)):
        from services.data_loader import load_regression_data
        X_train_r, _, _, _, features = load_regression_data()
        st.write(get_text("data_sample", lang))
        st.dataframe(X_train_r.head(5), use_container_width=True)
        st.write(get_text("data_dict", lang))
        meta = get_regression_metadata(lang=lang)
        cols = st.columns(2)
        for i, (col, desc) in enumerate(meta.items()):
            cols[i%2].markdown(f"- **{col}**: {desc}")
            
        st.write(f"*{get_text('source_label', lang)} {get_text('source_desc_reg', lang)}*")

    st.subheader(get_text("config", lang))
    col_r1, col_r2 = st.columns([2, 1])
    with col_r1:
        models_to_run_reg = st.multiselect(
            get_text("choose_models", lang),
            ["Linear Regression", "Decision Tree Regressor"],
            default=["Linear Regression", "Decision Tree Regressor"]
        )
    with col_r2:
        st.write(" ")
        st.write(" ")
        if st.button(get_text("run_experiment", lang), key="btn_run_reg"):
            with st.spinner("Processing..." if lang=="en" else "Processando..."):
                results, X_train, X_test, y_train, y_test, features = run_regression_pipeline(models_to_run_reg, lang=lang)
                st.session_state.reg_results = {
                    "results": results, "X_train": X_train, "X_test": X_test, 
                    "y_train": y_train, "y_test": y_test, "models_to_run": models_to_run_reg
                }

    if st.session_state.reg_results:
        res_data_reg = st.session_state.reg_results
        results = res_data_reg["results"]
        X_train = res_data_reg["X_train"]
        X_test = res_data_reg["X_test"]
        y_test = res_data_reg["y_test"]
        
        st.success(get_text("training_success", lang))
        st.subheader(get_text("metrics_comparison", lang))
        best_model_reg = min(results, key=lambda x: results[x]["metrics"]["MAE"])
        best_metrics_reg = results[best_model_reg]["metrics"]
        rm1, rm2, rm3 = st.columns(3)
        rm1.metric("MAE (Error)", f"{best_metrics_reg['MAE']:.2f}")
        rm2.metric("RMSE", f"{best_metrics_reg['RMSE']:.2f}")
        rm3.metric("R² Score", f"{best_metrics_reg['R2 Score']:.3f}")

        comparison_data = []
        for name, res in results.items():
            metrics = res["metrics"]
            comparison_data.append({"Model": name, "MAE": f"{metrics['MAE']:.2f}", "RMSE": f"{metrics['RMSE']:.2f}", "R² Score": f"{metrics['R2 Score']:.3f}"})
        st.table(pd.DataFrame(comparison_data))
        
        if len(res_data_reg["models_to_run"]) > 1:
            verdict = compare_models_explanation({k: v["metrics"] for k, v in results.items()}, "regression", lang=lang)
            st.markdown(verdict)
        
        st.divider()
        st.subheader(get_text("detailed_analysis", lang))
        tabs_reg = st.tabs(res_data_reg["models_to_run"])
        for i, model_name in enumerate(res_data_reg["models_to_run"]):
            with tabs_reg[i]:
                res = results[model_name]
                defn = get_model_definition(model_name, lang=lang)
                tr_col1, tr_col2 = st.columns([1, 1])
                with tr_col1:
                    st.info(f"{get_text('what_is_it', lang)} {defn['what']}\n\n{get_text('analogy', lang)} {defn['analogy']}")
                    st.markdown(res["explanation"])
                with tr_col2:
                    if hasattr(res["model"], "feature_importances_"):
                        st.markdown(f"#### {get_text('importance_title_reg', lang)}")
                        importances = res["model"].feature_importances_
                        feat_df = pd.DataFrame({'Feature': X_train.columns, 'Importance': importances})
                        feat_df = feat_df.sort_values(by='Importance', ascending=False).head(5)
                        fig_feat, ax_feat = plt.subplots(figsize=(4, 2.5))
                        sns.barplot(x='Importance', y='Feature', data=feat_df, palette='magma', ax=ax_feat, hue='Feature', legend=False)
                        st.pyplot(fig_feat)
                st.divider()
                cr_col1, cr_col2 = st.columns([1, 1])
                with cr_col1:
                    y_pred = res["model"].predict(X_test)
                    fig, ax = plt.subplots(figsize=(3, 2))
                    ax.scatter(y_test, y_pred, alpha=0.5, color='purple', s=10)
                    ax.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=1)
                    ax.set_xlabel('Actual' if lang=="en" else 'Real', fontsize=8)
                    ax.set_ylabel('Predicted' if lang=="en" else 'Previsto', fontsize=8)
                    ax.set_title(get_text("real_vs_pred", lang), fontsize=10)
                    st.pyplot(fig)
                with cr_col2:
                    with st.expander(get_text("how_to_read_reg", lang)):
                        st.write(get_text("reg_explanation", lang))

        # Simulator Reg
        st.divider()
        st.header(get_text("simulator_title", lang))
        st.write(get_text("simulator_desc", lang))
        with st.expander("❓ " + get_text("how_to_read_reg", lang) if lang=="en" else "❓ O que é isso?"):
            st.write(get_text("simulator_help", lang))
            
        sim_cols_reg = st.columns(3)
        input_data_reg = {}
        top_feats_reg = ["age", "bmi", "bp"]
        for i, feat in enumerate(top_feats_reg):
            val = sim_cols_reg[i%3].number_input(f"{feat}", value=float(X_train[feat].mean()), key=f"sim_reg_{feat}")
            input_data_reg[feat] = val
        
        if st.button(get_text("predict_btn", lang), key="btn_sim_reg"):
            full_input_reg = {col: X_train[col].mean() for col in X_train.columns}
            full_input_reg.update(input_data_reg)
            input_df_reg = pd.DataFrame([full_input_reg])
            best_model_r = results[best_model_reg]["model"]
            pred_reg = best_model_r.predict(input_df_reg)[0]
            st.subheader(get_text("prediction_value", lang))
            st.metric("Score", f"{pred_reg:.1f}")

st.divider()
st.markdown("Built with ❤️ by Antigravity for ML Students")
