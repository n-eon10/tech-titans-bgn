import streamlit as st
from components import search_input
from utils import go_to_page

def show():
    st.image("Google_logo_clear.jpg", width=400)
    #st.header("Explore Page")
    search_query = search_input()
    #if st.button("Go to Map", on_click=go_to_page, args=('map',)):
    #    pass

    # Define custom styles
    def custom_header(text):
        st.markdown(f"""
            <style>
                .streamlit-container {{
                    padding-left: 0px;
                    padding-right: 0px;
                }}
                .css-1d391kg, .stMarkdown {{
                    text-align: left;
                    margin-left: 0px;
                    padding-left: 0px;  /* Ensures no padding on the left */
                }}
            </style>
            <h2 class='css-1d391kg' style='color: black; font-size: 20px;'>{text}</h2>
        """, unsafe_allow_html=True)

    # Use the custom header function
    custom_header("Trending Events")
    custom_header("Upcoming Events")

    #st.header("Trending Events")
    #st.header("Upcoming Events")

# Call the show function to display page        
if __name__ == "__main__":
    show()
