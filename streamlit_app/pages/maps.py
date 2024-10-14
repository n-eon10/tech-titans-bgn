import streamlit as st
import pydeck as pdk
import requests
import geocoder
from geopy.distance import geodesic  # Import geodesic to calculate distances

def generate_pins():
    """Fetch data from APIs and generate map pins from Black businesses and events."""
    # Fetch data from APIs
    bbfetch = requests.get("http://localhost:4000/api/blackbusinesses/getallblackbusiness")
    eventsfetch = requests.get("http://localhost:4000/api/events/getallevents")  # Update the correct endpoint for events

    # Parse the response as JSON
    bb = bbfetch.json().get('data', [])  # Safely retrieve the 'data' key
    events = eventsfetch.json().get('events', [])  # Safely retrieve the 'events' key

    locations = []

    for i in bb:
        # Convert the string '51.47376257787879, -0.06546801834152499' into [51.47376257787879, -0.06546801834152499]
        lat, lon = map(float, i['location'].split(','))
        locations.append({'position': [lon, lat], 'description': '', 'title': i['name']})

    for i in events:
        lat, lon = map(float, i['location'].split(','))
        locations.append({'position': [lon, lat], 'description': i['description'], 'title': i['name']})

    return locations


def find_nearest_events(user_location, events):
    """Find and return events sorted by proximity to user location."""
    nearby_events = []
    
    for event in events:
        event_location = event['position']  # This is [lon, lat]
        event_latlon = (event_location[1], event_location[0])  # Convert to (lat, lon)
        distance = geodesic(user_location, event_latlon).kilometers  # Calculate distance in kilometers
        event['distance'] = distance  # Add distance to event info
        nearby_events.append(event)

    # Sort events by distance (nearest first)
    nearby_events.sort(key=lambda x: x['distance'])
    return nearby_events[:4]  # Return the top 4 nearest events


pins = generate_pins()


def show():
    """Main function to display the map and nearest events."""
    st.title("WeOutside")

    # Get user's current location using geocoder
    user_location = geocoder.ip('me').latlng  # Get [lat, lon] of the user

    # Initialize map view
    initial_view_state = pdk.ViewState(
        latitude=user_location[0],
        longitude=user_location[1],
        zoom=11,
        pitch=50
    )

    # Find the nearest events to the user
    nearest_events = find_nearest_events(user_location, pins)

    # Sidebar: Display nearest events
    with st.sidebar:
        st.header("Events Near You")

        for i, event in enumerate(nearest_events):
            st.text_area(f"Event {i+1}: {event['title']}",
                         f"Description: {event['description']}\n"
                         f"Distance: {event['distance']:.2f} km")

    # Create the PyDeck layer using the pins data
    layer = pdk.Layer(
        "ScatterplotLayer",  # ScatterplotLayer is great for point data
        pins,  # The list of pins as data
        get_position="position",  # Field in data that contains positions (longitude, latitude)
        get_fill_color=[255, 0, 0],  # Optional: set color for the points (red in this case)
        get_radius=20,  # Radius of each point (in meters)
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
