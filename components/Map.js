import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

const Map = ({searchResults}) => {

    const coordinates = searchResults.map(result => ({ 
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

  return (
  
    <ReactMapGL
    initialViewState={{
      longitude: center.longitude,
      latitude: center.latitude,
      zoom: 14
    }}
    style={{width: "100%", height: '100%'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.mapbox_key}>
       
       {searchResults.map(result => (
           <div key={result.long}>
               <Marker 
               longitude={result.long}
               latitude={result.lat}
               >
                   <p>👩‍🦳 </p>
               </Marker>
           </div>
       ))}

        </ReactMapGL>
  )
}

export default Map