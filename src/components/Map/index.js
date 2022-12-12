import {React, useState,useEffect} from 'react';
import { MapContainer, TileLayer ,LayersControl,ScaleControl,ZoomControl,GeoJSON} from 'react-leaflet';
import tileLayers from '../../util/tileLayer';
import ReactDOMServer from "react-dom/server";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import LocationButton from '../LocationButton';
import portGeoJson from '../../data/World_Port_Index+(1)+(1).geojson.json';
import polyGons from '../../data/abc.json'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
// import countries from '../../data/countries.geojson.json'
import L from 'leaflet';
// import newMarker from "../../data/pin.png";
import Card from '../Card';
const center = [22.366904, 77.534981];
// const pointerIcon = new L.Icon({
//     iconUrl: newMarker,
//     iconSize: [16, 16], 
//     iconAnchor: [8, 13], 
//     popupAnchor: [0, -10],
//   });
  
const Map = ({setAlertInfo,showPorts,showPolygons,isClustered}) => {
    const [map, setMap] = useState(null);
    
    const onEachFeature = (feature, layer) => {
        layer.bindPopup(ReactDOMServer.renderToString(<Card props={feature.properties} />));
      }
    const getPolygonName = (feature, layer) => {
        layer.bindPopup(feature.properties.DISTRICT);
    }
    const onEachPolygonFeature =(feature, layer)=> {
        layer.on('mouseover', function (e) {
      
          getPolygonName(feature, layer);
      
          this.openPopup();
      
          // style
          this.setStyle({
            fillColor: '#eb4034',
            weight: 2,
            color: '#eb4034',
            fillOpacity: 0.7,
          });
        });
        layer.on('mouseout', function () {
          this.closePopup();
          // style
          this.setStyle({
            fillColor: '#3388ff',
            weight: 2,
            color: '#3388ff',
            fillOpacity: 0.2,
          });
        })};
    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, {
            fillColor:'#000d37',
            color:'#f6f7f9',
            weight:2,
            radius:5,
            fillOpacity:0.95,
        })
    }

    const handleShowPorts = () => {
        return <GeoJSON data={portGeoJson} onEachFeature={onEachFeature}   pointToLayer={pointToLayer} />
    }
    useEffect(() => {
        if(showPolygons) {
            map.flyTo(center,5);
        }
    },[showPolygons,map])
    useEffect(() => {
        if(isClustered) {
            map.flyTo(center,1);
        }
    },[isClustered,map])
    return (
        <MapContainer
            preferCanvas={true}
            zoomControl={false}
            whenCreated={setMap}
            whenReady={() => setAlertInfo({text:"Map is ready!!",severity:"success",duration:500})}
            fullscreenControl={true}
            center={center}
            zoom={5}
            scrollWheelZoom={true}
        >
            <ZoomControl position={'topright'} />
            <LayersControl position="topright">
            {tileLayers.map((layer, idx) => {
                return (
                    <LayersControl.BaseLayer
                    key={idx}
                    checked={!idx}
                    name={layer.name}
                    >
                        <TileLayer
                            attribution={layer.attribution}
                            url={layer.url}
                        />
                    </LayersControl.BaseLayer>
                )
            })}
            </LayersControl>

           {showPorts && (isClustered ? <MarkerClusterGroup>{handleShowPorts()}</MarkerClusterGroup> :handleShowPorts()) }
           {showPolygons && <GeoJSON data={polyGons} onEachFeature={onEachPolygonFeature} weight={1}/>}
            <LocationButton map={map} setAlertInfo={setAlertInfo}/>
            <ScaleControl imperial={false} />
        </MapContainer>
    );
}

export default Map;