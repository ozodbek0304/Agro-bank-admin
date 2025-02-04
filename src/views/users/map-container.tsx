import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from "react";



interface MapComponentsProps {
    setMapPosition: (position: { lat: any; lng:any }) => void;
    mapPosition: any
}


const MapComponents: React.FC<MapComponentsProps> = ({setMapPosition, mapPosition }) => {


    function LocationMarker() {
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound(e) {
                setMapPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            },
        });

        useEffect(() => {
            if (mapPosition) {
                map.flyTo(mapPosition, map.getZoom(), {
                    animate: true,
                    duration: 3,
                });
            }
        }, [mapPosition, map]);

        return mapPosition === null ? null : (
            <Marker position={mapPosition} >
                <Popup>Siz turgan joy</Popup>
            </Marker>
        );
    }

    return (
        <div className="w-100 my-3">
                <MapContainer
                    center={mapPosition}
                    zoom={15}
                    style={{ height: '700px', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
        </div>
    );
}

export default MapComponents;