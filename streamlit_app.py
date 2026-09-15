import streamlit as st

# Configure page layout to use full screen width
st.set_page_config(page_title="Himalayan Java Insight", layout="wide")

# Hide default Streamlit padding for a seamless dashboard view
st.markdown("""
    <style>
        .block-container { padding-top: 1rem; padding-bottom: 0rem; padding-left: 1rem; padding-right: 1rem; }
    </style>
""", unsafe_allow_html=True)

# Render your full Vercel app inside Streamlit
st.components.v1.iframe(
    "https://himalayan-java-insight.vercel.app", 
    height=850, 
    scrolling=True
)