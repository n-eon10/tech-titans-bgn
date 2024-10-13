import streamlit as st

def go_to_page(page_name):
    """Function to handle page navigation."""
    st.session_state['page'] = page_name