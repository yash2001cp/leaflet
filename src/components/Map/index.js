import {React, useState,useEffect} from 'react';
import { MapContainer, TileLayer ,LayersControl,ScaleControl,ZoomControl,GeoJSON} from 'react-leaflet';
import tileLayers from '../../util/tileLayer';
import ReactDOMServer from "react-dom/server";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import glify from 'leaflet.glify';
import LocationButton from '../LocationButton';
import cPortJsonData from '../../data/World_Port_Index+(1)+(1).geojson.json';
import airPortJsonData from '../../data/features.json'
import countriesJson from '../../data/custom.geo (5).json';
import polyGons from '../../data/abc.json'
import railsPoints from '../../data/expors (1).geojson.json'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
// import countries from '../../data/countries.geojson.json'
import L from 'leaflet';
import RoutingMachine from '../RoutingMachine';
import Card from '../Card';
// import { MBTiles } from 'leaflet-tilelayer-mbtiles-ts';
import './styles.css';
const center = [22.366904, 77.534981];
  
const Map = ({setAlertInfo,cPorts,countries,airPorts,isClustered}) => {
    const [map, setMap] = useState(null);
    const [data, setData] = useState({})
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
        layer.bindPopup(feature.properties.name_en);
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
      
          // style
        //   this.setStyle({
        //     // fillColor: '#eb4034',
        //     weight: 1,
        //     // color: '#eb4034',
        //     fillOpacity: 0,
        //   });
        });
        // layer.on('mouseout', function () {
        //   this.closePopup();
        //   // style
        // //   this.setStyle({
        // //     weight: 1,
        // //   });
        // })
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
    const fetchData = async () => {
        let data = await fetch(
            "https://weak-monkeys-sell-103-143-39-118.loca.lt/docs"
            )
            .then((response) => {console.log(response,'ress');return response.json()})
            .then((geojson) => {
              console.log("my_data: ", geojson)
              setData(geojson);
            })
           .catch((error) => {
              console.log(error);
            });
    }

    useEffect(() => {
        if(countries) {
            map.flyTo(center,5);
        }
    },[countries,map])
    useEffect(() => {
        if(isClustered) {
            map.flyTo(center,1);
        }
    },[isClustered,map])

    useEffect(() => {
        if(map) {
            fetchData();
            // let mbtiles = new MBTiles('https://data.maptiler.com/download/WyI5ZWI0MGVjYS05MDllLTRmNDctOTM3NC1iNzc2OTNjYjAwZTQiLCItMSIsNzkwMV0.Y5hYYQ.LcNQPgUllWLckxovn9oCX0S33aY/maptiler-osm-2017-07-03-v3.6.1-planet.mbtiles?usage=personal', {attribution:'',name:''});
            // mbtiles.addTo(map);

        }
    },[map])
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
            attributionControl={false}
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

           {cPorts && (isClustered ? <MarkerClusterGroup>{handleShowPorts(cPortJsonData)}</MarkerClusterGroup> :handleShowPorts(cPortJsonData)) }
           {airPorts && (isClustered ? <MarkerClusterGroup>{handleShowPorts(airPortJsonData)}</MarkerClusterGroup> :handleShowPorts(airPortJsonData)) }
           {countries && <GeoJSON data={countriesJson} onEachFeature={onEachPolygonFeature} weight={1} /> }
            <LocationButton map={map} setAlertInfo={setAlertInfo}/>
            <ScaleControl imperial={false} value={10}/>
            <RoutingMachine />
        </MapContainer>
    );
}

export default Map;