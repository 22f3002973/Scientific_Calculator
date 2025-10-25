# streamlit_app.py
import streamlit as st

st.title("Scientific Calculator")

st.write("Your HTML/JS calculator cannot run directly in Streamlit, but you can embed it in an iframe:")

st.components.v1.html(
    """
    <iframe src="https://sakshi101214.github.io/Scientific_Calculator/" width="600" height="700"></iframe>
    """,
    height=700,
)
