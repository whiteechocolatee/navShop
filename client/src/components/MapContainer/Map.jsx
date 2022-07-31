import React from "react";
import "./map.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

export const Map = () => {
  return (
    <MapContainer
      styles={{ height: "100%", width: "100%" }}
      center={[50.009463, 36.350541]}
      zoom={15}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[50.009463, 36.350541]}>
        <Popup>
          Ми знаходимось тут. ТРК "Клас". Другий поверх
        </Popup>
      </Marker>
    </MapContainer>
  );
};
