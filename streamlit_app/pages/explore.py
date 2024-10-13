import streamlit as st
from components import search_input
from utils import go_to_page

def show():
    st.header("Explore Page")
    search_query = search_input()
    if st.button("Go to Map", on_click=go_to_page, args=('map',)):
        pass