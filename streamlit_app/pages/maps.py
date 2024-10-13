import streamlit as st
import pydeck as pdk
#from data_manager import fetch_data, prepare_data_for_map
from components import search_input
from utils import go_to_page
import requests

# Fetch data from APIs
bbfetch = requests.get("http://localhost:4000/api/blackbusinesses/getallblackbusiness")
eventsfetch = requests.get("http://localhost:4000/api/events/getallevents")  # Update the correct endpoint for events

# Parse the response as JSON
bb = bbfetch.json().get('data', [])  # Safely retrieve the 'data' key
events = eventsfetch.json().get('events', [])  # Safely retrieve the 'events' key

# Create a list of pins (markers) from black businesses and events
pins = []

# Convert string positions to lists of [longitude, latitude]
for i in bb:
    # Convert the string '51.47376257787879, -0.06546801834152499' into [51.47376257787879, -0.06546801834152499]
    lat, lon = map(float, i['location'].split(','))
    pins.append({'position': [lon, lat], 'description': '', 'title': i['name']})

for i in events:
    lat, lon = map(float, i['location'].split(','))
    pins.append({'position': [lon, lat], 'description': '', 'title': i['name']})

print(pins)  # Verify the positions are now in the correct format

def show():
    st.title("WeOutside")
    search_query = search_input()

    # Initialize map view
    initial_view_state = pdk.ViewState(
        latitude=51.5043,  # Center the map at a default location (London in this case)
        longitude=-0.1232,
        zoom=11,
        pitch=50
    )

    # Create the PyDeck layer using the pins data
    layer = pdk.Layer(
        "ScatterplotLayer",  # ScatterplotLayer is great for point data
        pins,  # The list of pins as data
        get_position="position",  # Field in data that contains positions (longitude, latitude)
        get_fill_color=[255, 0, 0],  # Optional: set color for the points (red in this case)
        get_radius=200,  # Radius of each point (in meters)
        pickable=True,  # Enable interaction with points
    )

    # Create the Deck with the initial view and layer
    map = pdk.Deck(
        layers=[layer],
        initial_view_state=initial_view_state,
        tooltip={"html": "<b>Title:</b> {title}<br><b>Description:</b> {description}"},  # Tooltip for points
    )

    # Display the PyDeck map in Streamlit
    st.pydeck_chart(map)

# Call the show function to display the map
if __name__ == "__main__":
    show()
