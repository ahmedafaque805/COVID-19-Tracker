import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";
import '../../App.css'
import { showDataOnMap } from "../../utilities";

function Map({ center , zoom , countries , casesType }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
