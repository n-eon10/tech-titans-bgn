import streamlit as st
from pages import explore, maps
from utils import go_to_page


def apply_custom_css():
    st.markdown("""
        <style>
        .reportview-container {
            background: #FFFFFF;  # Set background to white
            color: #000000;  # Set text color to black for readability
        }
        .sidebar .sidebar-content {
            background: #FFFFFF;  # Set sidebar background to white
        }
        </style>
        """, unsafe_allow_html=True)
    


def sidebar_controls():
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Choose a page:", ["Explore", "Map"])

    if page == 'Explore':
        explore.show()
    elif page == 'Map':
        maps.show()
        
    
def main():
    """Main function to initialize the app and include all components."""
    # Apply custom CSS for background color
    apply_custom_css()

    # Sidebar navigation controls
    sidebar_controls()

# Initialize session state for page navigation
if 'page' not in st.session_state:
    st.session_state['page'] = 'explore'  # default page

# Routing
#if st.session_state['page'] == 'explore':
#    explore.show()
#elif st.session_state['page'] == 'map':
#    maps.show()