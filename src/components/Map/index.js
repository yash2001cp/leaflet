import {React, useState,useEffect} from 'react';
import { MapContainer, TileLayer ,LayersControl,ScaleControl,ZoomControl,GeoJSON,Polyline, CircleMarker,useMap,Marker} from 'react-leaflet';
import ReactDOMServer from "react-dom/server";
// import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
// import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl';
import LocationButton from '../LocationButton';
import cPortJsonData from '../../data/World_Port_Index+(1)+(1).geojson.json';
// import postalCode from '../../data/geonames-postal-code.geojson.json'
import airPortJsonData from '../../data/features.json'
import countriesJson from '../../data/custom.geo (5).json';
// import polyGons from '../../data/abc.json'
// import railsPoints from '../../data/expors (1).geojson.json'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
// import countries from '../../data/countries.geojson.json'
import L from 'leaflet';
// import RoutingMachine from '../RoutingMachine';
import Card from '../Card';
// import routes from '../../data/fin_sea.json';
import routes from '../../data/seaRoutes.json'
// import 'Leaflet.TileLayer.MBTiles'
import './styles.css';
import shipIcon from '../../data/ic-ship.svg';
import truckIcon from '../../data/ic-truck.svg';
import air from '../../data/ic-air.svg';
import "leaflet.motion/dist/leaflet.motion.js";
import demoRoute from '../../data/demoRoute.json'

const {overlay,tileLayer,markerOptions,getMidPoint} = require('../../util/assets')
const center = [22.366904, 77.534981];

const shippingPathIcon = new L.Icon({
    iconUrl: shipIcon,
    iconSize: [32, 32], 
    iconAnchor: [16, 34], 
  });
const roadPathIcon = new L.Icon({
    iconUrl: truckIcon,
    iconSize: [32, 32], 
    iconAnchor: [16, 26], 
  });
  const airIcon = new L.Icon({
    iconUrl: air,
    iconSize: [32, 32], 
    iconAnchor: [16, 34], 
  });

// const roadFrom = L.motion.polyline(demoRoute.roadFrom.path, {
//     color: "#1eb041",weight:2,dashArray: '1,3'
// }, {
//     auto: true,
//     duration: 5000,
//     easing: L.Motion.Ease.easeInOutQuart
// }, {
//     removeOnEnd: true,
//     icon: roadPathIcon,
// });
// const shippingPath = L.motion.polyline(demoRoute.mainRoute.path, {
//     color: "#0ABBF5",weight:2,
//     }, {
//         duration: 12000,
//         easing: L.Motion.Ease.easeInOutQuart
//     }, {
//         removeOnEnd: true,
//         icon: shippingPathIcon,
//     });
// const roadTo = L.motion.polyline(demoRoute.roadTo.path, {
//     color: "#1eb041",weight:2,dashArray: '2,4'
// }, {
//     duration: 5000,
//     easing: L.Motion.Ease.easeInOutQuart
// }, {
//     removeOnEnd: true,
//     icon: roadPathIcon,
// });
// const airPath = L.motion.polyline(demoRoute.air.path, {
//     color: "purple",weight:2,
// }, {
//     duration: 10000,
//     easing: L.Motion.Ease.easeInOutQuart
// }, {
//     // removeOnEnd: true,
//     icon: airIcon,
// });
// const sqGroup = L.motion.seq([
//     roadFrom, shippingPath, roadTo
// ]);
const Map = ({setAlertInfo,cPorts,countries,airPorts,isClustered,showPath,cRoutes}) => {
    const [map, setMap] = useState(null);
    const [zoom, setZoom] = useState(5);
    
    // const mb = L.tileLayer.mbTiles('../../data/countries-raster.mbtiles', {
	// 	minZoom: 0,
	// 	maxZoom: 6
	// })
    const whenCreated = (map) => {
        map.on('zoom',(e) => {
            setZoom(e.target._zoom);
        })
        setMap(map);
    }
    const getPortDetails = (feature, layer) => {
        layer.bindPopup(ReactDOMServer.renderToString(<Card props={feature.properties} />));
      }

    const onEachPortFeature = (feature, layer) => {
        layer.on('mouseover', function (e) {
            L.DomEvent.stopPropagation(e);
            getPortDetails(feature, layer);
            this.openPopup();
          });
          layer.on('mouseout', function () {
            this.closePopup();
          });
    }
    const getPolygonName = (feature, layer) => {
        layer.bindPopup(feature?.properties?.name_en);
    }
    const onEachPolygonFeature =(feature, layer)=> {
          layer.setStyle({
            // fillColor: '#eb4034',
            weight: 1,
            // color: '#eb4034',
            fillOpacity: 0,
          });
        layer.on('mouseover', function (e) {
        L.DomEvent.stopPropagation(e);
          getPolygonName(feature, layer);
          this.openPopup();
        });
    };
    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, {
            fillColor:feature?.properties?.PORT_NAME ? '#000d37' : '#ff5722',
            color:'#f6f7f9',
            weight:1,
            radius:5,
            fillOpacity:0.95,
        })

    }

    const handleShowPorts = (data) => {
        return <GeoJSON data={data} onEachFeature={onEachPortFeature}   pointToLayer={pointToLayer} />
    }
    useEffect(() => {
        if(isClustered) {
            map.flyTo(center,1);
        }
    },[isClustered,map])

    // useEffect(() => {
    //     if(showPath && map) {
    //         sqGroup.addLayer(airPath, true);
    //         sqGroup.addTo(map);
    //     }
    //     else{
    //         map?.removeLayer(sqGroup);
    //     }
    // },[showPath,map])

    useEffect(() => {
        console.log('zoom->',zoom);
    },[zoom]);

    // useEffect(() => {
    //     if(map) {
    //         const key = 'plLZXQlJHwYmvtwLqzhu';
    //         const gl = L.maplibreGL({
    //             attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    //             style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`
    //         });
    //         gl.addTo(map);
    //             //     mb.addTo(map);
    //             // mb.on('databaseloaded', function(ev) {
    //             //     console.info('MBTiles DB loaded', ev);
    //             // });
    //     }
    // },[map]);
   
    return (
        <MapContainer
            preferCanvas={true}
            zoomControl={false}
            whenCreated={whenCreated}
            whenReady={() => setAlertInfo({text:"Map is ready!!",severity:"success",duration:500})}
            // fullscreenControl={true}
            center={center}
            zoom={5}
            scrollWheelZoom={true}
        >
            <ZoomControl position={'topright'} />
            <LayersControl position="topright">
            {tileLayer.map((layer, idx) => {
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
            {overlay.map((layer,idx) => {
                return (
                    <LayersControl.Overlay key={idx} checked={!idx} name={layer.name}>
                        <TileLayer
                            attribution={layer.attribution}
                            url={layer.url}
                            minZoom={7}
                            maxZoom={layer?.maxZoom || 18}
                            opacity={0.5}
                            transparent={true}
                            zIndex={-1}
                        />
                    </LayersControl.Overlay>
                )
            })}
            </LayersControl>

           {cPorts && (isClustered ? <MarkerClusterGroup>{handleShowPorts(cPortJsonData)}</MarkerClusterGroup> :handleShowPorts(cPortJsonData)) }

           {airPorts && (isClustered ? <MarkerClusterGroup>{handleShowPorts(airPortJsonData)}</MarkerClusterGroup> :handleShowPorts(airPortJsonData)) }

           {countries && <GeoJSON data={countriesJson} onEachFeature={onEachPolygonFeature} weight={1} /> }
           {/* {(countries && data) ? (Object.values(data || {})).map((countryJson) => {
            return <GeoJSON data={countryJson} onEachFeature={onEachPolygonFeature} weight={1} />
           }) :null} */}

            <LocationButton map={map} setAlertInfo={setAlertInfo}/>
            <ScaleControl imperial={false} value={10}/>
            {/* <RoutingMachine /> */}

            {showPath && (Object.values(demoRoute) || []).map(({type,waypoints,path}) => {
                return <>
                    <Polyline pathOptions={{color:'gray',weight:6,opacity:0.5}} positions={path} />
                    {waypoints.map((latlng) => {
                        return <CircleMarker center={latlng} {...markerOptions(type)}/>;
                    })}
                </>;
            })}
            {cRoutes && routes.map(({sea}) => {
                return <>
                    <Polyline pathOptions={{color:'black',weight:1,opacity:1}} positions={sea?.path} />
                    <CircleMarker center={sea?.path[0]} radius={3} fillColor='#000d37' color='#fffff' weight={3}/>
                    <CircleMarker center={sea?.path.slice(-1)[0]} radius={3} fillColor='#000d37' weight={3}/>
                </>;
            })}
            
        </MapContainer>
    );
}

export default Map;