from altair import Latitude, Longitude
import streamlit as st
import pydeck as pdk


# Initialize the session state for page navigation if it's not already set
if 'page' not in st.session_state:
    st.session_state['page'] = 'explore'  # 'home' is the default page

def go_to_page(page_name):
    st.session_state['page'] = page_name


# Main area
if st.session_state['page'] == 'explore':
    st.header("Explore Page")
    # Ask the user for a search query
    search_query = st.text_input("Search ", "")
    st.button("Map", on_click=go_to_page, args=('map',), type="secondary", disabled=False, use_container_width=False)
elif st.session_state['page'] == 'map':
    st.title("WeOutside")

    with st.sidebar:
        st.button("Home", on_click=go_to_page, args=('explore',), type="secondary", disabled=False, use_container_width=False)
        st.header("Events Near You")
        st.text_area("Event Title1","Event Description: .....")
        st.text_area("Event Title2","Event Description: .....")
        st.text_area("Event Title3","Event Description: .....")
        st.text_area("Event Title4","Event Description: .....")
    # Ask the user for a search query
    search_query = st.text_input("Search", "")


    #retreive the data from database 
    

    # Convert data to the format expected by PyDeck
    #formatted_data = [{'POSITION_NAME ': [lon, lat], 'DESCRIPTION NAME': desc,'TITLE': title} for lon, lat, desc,title in data]

    # Embedding Google Maps
    # Set up a PyDeck map view
    initial_view_state = pdk.ViewState(
        latitude=51.5043,  # Coordinates for the map center 
        longitude=-0.1232,
        zoom=11,
        pitch=50,
    )


    # Create the map layer
    layer = pdk.Layer(
        'HexagonLayer',  # Type of the map layer
        data=[{'position': [lon, lat]} for (lon, lat) in [(Longitude, Latitude)]],  # List of coordinates
        get_position='[lon, lat]',
        radius=200,
        elevation_scale=4,
        elevation_range=[0, 1000],
        pickable=True,
        extruded=True,
    )

    # Create the map
    map = pdk.Deck(
        layers=[layer],
        initial_view_state=initial_view_state,
        tooltip={'text': 'Concentration of events'}
    )

    st.pydeck_chart(map)