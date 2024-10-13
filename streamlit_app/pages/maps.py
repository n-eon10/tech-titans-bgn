import streamlit as st
import pydeck as pdk
#from data_manager import fetch_data, prepare_data_for_map
from components import search_input
from utils import go_to_page
import requests

#bb = requests.get("http://localhost:4000/api/blackbusinesses/getblackbusiness")
#print(bb.json())

test_data = [
    {'position': [-0.1276, 51.5074], 'description': 'London', 'title': 'City of London'},
    {'position': [-0.118092, 51.509865], 'description': 'London Eye', 'title': 'Ferris Wheel'},
    {'position': [-0.1419, 51.5014], 'description': 'Buckingham Palace', 'title': 'Royal Residence'}
]

def show():
    st.title("WeOutside")
    search_query = search_input()

    # GET DATA AND FORMAT IT HERE 

    #data = fetch_data("SELECT * FROM events WHERE...", [search_query])
    #formatted_data = prepare_data_for_map(data)

    initial_view_state = pdk.ViewState(latitude=51.5043, longitude=-0.1232, zoom=11, pitch=50)
    layer = pdk.Layer(
        #'HexagonLayer', data=formatted_data, get_position='position',
        test_data,
        get_position='position',
        radius=200, elevation_scale=4, elevation_range=[0, 1000], pickable=True, extruded=True
    )
    map = pdk.Deck(
        layers=[layer], 
        initial_view_state=initial_view_state, 
        #tooltip={'text': 'Event Details'})
        tooltip={'html': '<b>Title:</b> {title}<br><b>Description:</b> {description}'}
        )
    st.pydeck_chart(map)