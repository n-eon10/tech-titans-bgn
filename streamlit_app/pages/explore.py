import streamlit as st
from components import search_input
from utils import go_to_page
import requests
from datetime import datetime


# Fetch functions
def fetch_trending_events():
    """Placeholder for trending events fetch function."""
    # You can replace this with an actual API call
    trending_events = [
        {"name": "Music Fest", "location": "Central Park", "description": "A grand music festival."},
        {"name": "Art Exhibition", "location": "Downtown Gallery", "description": "Showcasing modern art."},
        {"name": "Film Festival", "location": "Cinema City", "description": "International film screenings."}
    ]
    return trending_events


def fetch_upcoming_events():
    """Fetch upcoming events from the API."""
    response = requests.get("http://localhost:4000/api/events/upcomingevents")
    events = response.json().get('events', [])  # Safely get the 'events' key
    return events


def fetch_upcoming_restaurants():
    """Placeholder for upcoming restaurants fetch function."""
    # Mock data for now
    restaurants = [
        {"name": "La Pizzeria", "location": "123 Pizza Lane", "description": "Authentic Italian pizza."},
        {"name": "Sushi Master", "location": "456 Sushi Street", "description": "Fresh sushi and sashimi."},
        {"name": "Burger Queen", "location": "789 Burger Blvd", "description": "Gourmet burgers with a twist."}
    ]
    return restaurants


# Rendering horizontal scroll sections
def render_horizontal_scrollbar(category_title, items):
    """Render a horizontal scrollbar with items."""
    st.subheader(category_title)

    if len(items) == 0:
        st.write(f"No {category_title.lower()} found.")
        return

    cols = st.columns(len(items))  # Create columns for each item

    for idx, item in enumerate(items):
        with cols[idx]:
            st.text(item['name'])
            st.text(f"Location: {item.get('location', 'N/A')}")
            st.text(f"Description: {item.get('description', 'N/A')}")


# Main page function
def show():
    # Display a logo image at the top
    st.image("Google_logo_clear.jpg", width=400)
    
    # Search input functionality (if you have one)
    search_query = search_input()

    # Custom header function for consistent styling
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

    # Use the custom header function for each section
    custom_header("Trending Events")
    trending_events = fetch_trending_events()
    render_horizontal_scrollbar("Trending Events", trending_events)

    custom_header("Upcoming Events")
    upcoming_events = fetch_upcoming_events()
    render_horizontal_scrollbar("Upcoming Events", upcoming_events)

    custom_header("Upcoming Restaurants")
    upcoming_restaurants = fetch_upcoming_restaurants()
    render_horizontal_scrollbar("Upcoming Restaurants", upcoming_restaurants)

    # Add a button to navigate to a map (optional)
    if st.button("Go to Map", on_click=go_to_page, args=('map',)):
        pass


# Call the show function to display the explore page
if __name__ == "__main__":
    show()
