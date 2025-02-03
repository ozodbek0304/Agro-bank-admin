import { useState } from "react";
import MapComponents from "../map-container";

const defaultCenter = { lat: 41.288975, lng: 69.2237581};
const UserDetailMain = () => {
    const [mapPosition, setMapPosition]=useState(defaultCenter)
    const [currentLocation, setCurrentLocation]=useState()
     console.log(currentLocation);
     

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <MapComponents
             setCurrentLocation={setCurrentLocation}
             setMapPosition={setMapPosition}
             mapPosition={mapPosition}
                        />
        </div>
    );
}

export default UserDetailMain;
