import streamlit as st
from pages import explore, maps
from utils import go_to_page

# Initialize session state for page navigation
if 'page' not in st.session_state:
    st.session_state['page'] = 'explore'  # default page

# Routing
if st.session_state['page'] == 'explore':
    explore.show()
elif st.session_state['page'] == 'map':
    maps.show()