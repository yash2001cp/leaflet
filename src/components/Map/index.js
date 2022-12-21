import {React, useState,useEffect} from 'react';
import { MapContainer, TileLayer ,LayersControl,ScaleControl,ZoomControl,GeoJSON,Polyline, CircleMarker} from 'react-leaflet';
import ReactDOMServer from "react-dom/server";
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl';
import LocationButton from '../LocationButton';
import { Button } from '@mui/material';
import cPortJsonData from '../../data/World_Port_Index+(1)+(1).geojson.json';
import jsonData from '../../data.json'
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
import routes from '../../data/uniqueRoutes.json'
// import 'Leaflet.TileLayer.MBTiles'
import './styles.css';
import shipIcon from '../../data/ic-ship.svg';
import truckIcon from '../../data/ic-truck.svg';
import air from '../../data/ic-air.svg';
import "leaflet.motion/dist/leaflet.motion.js";
import demoRoute from '../../data/demoRoute.json'
import Fullscreen from 'react-leaflet-fullscreen-plugin';
import "leaflet.animatedmarker/src/AnimatedMarker";

const {overlay,tileLayer,markerOptions,getMidPoint} = require('../../util/assets')
const center = [22.366904, 77.534981];
// const shortPath =
// [[1.85, -78.81666666670003],
// [-1.001694, -91.060472],
// [-16.691278, -179.84419400000002],
// [-16.765444, 179.935],
// [-16.8166666667, 179.3]]

// for(let i=1;i<shortPath.length;i++) {
//     if(shortPath[i][1] - shortPath[i-1][1] >= 200) {
//         shortPath[i][1] -= 360;
//     }
// }

const customPath = [[18.740849187479427,72.5889015197754],[18.532504133541487,71.9736671447754],[17.57087992254944,69.9521827697754],[17.403109542186247,68.4140968322754],[16.772608630130165,65.5576515197754],[15.717146051649944,61.8222999572754],[14.996269657813299,59.1855812072754],[14.61363550586799,54.9668312072754],[13.675530329736626,51.6269874572754],[12.69077599238401,48.4629249572754],[12.046466172387982,45.7822608947754],[12.304380456022919,44.2002296447754],[12.73367296681467,43.40921401977539],[14.400771563795455,41.7832374572754],[17.57087992254944,40.4209327697754],[18.990524166984617,39.45413589477539],[21.05622032051235,38.8828468322754],[21.238547899443454,38.97949218750001]];
// const data =[[42.9833333340001, 144.366666666], [76.4940809715964, 94.25542996179381], [73.97996067509472, 107.72091283254615], [59.008728424273016, 5396.490416021871], [-9.953758775743735, 5412.601130410691], [70.05347188222055, 5500.7188461803635], [-22.481739651448212, 132.54281816252129], [41.089509890835416, 309020.1225212498], [55.133333334, -6.66666666699996]]

let data = [[-27.380726, 153.164001],
[-32.55598126940562, 132.89152561744405],
[-38.68868477635183, 145.25393149194323],
[-34.58233121297391, 151.42139800908168],
[-31.193196823385875, 153.1674546508274],
[-29.286146117723938, 154.0657274561335],
[-27.380726, 153.164001],
[-29.286146117723938, 154.0657274561335],
[-31.193196823385875, 153.1674546508274],
[-32.887764018179894, 152.29442632995455],
[-38.1337914789332, 149.3352350992913],
[-34.58233121297391, 151.42139800908168],
[-36.35806134595356, 150.37831655418648],
[-38.1337914789332, 149.3352350992913],
[-38.41123812764251, 147.29458329561726],
[-36.4285787231018, 138.67276871812027],
[-38.40983588201509, 141.67102917664076],
[-39.44654693462295, 143.3926466196631],
[-38.68868477635183, 145.25393149194323],
[-39.44654693462295, 143.3926466196631],
[-38.17007872251291, 139.67572144819744],
[-38.40983588201509, 141.67102917664076],
[-38.17007872251291, 139.67572144819744],
[-35.24002293867604, 135.2812674496286],
[-36.68365378353612, 136.67936129858393],
[-36.4285787231018, 138.67276871812027],
[-36.68365378353612, 136.67936129858393],
[-35.24002293867604, 135.2812674496286],
[-33.89800210404083, 134.08639653353632],
[-34.057727705742074, 119.74641668100259],
[-32.55598126940562, 132.89152561744405],
[-32.74369957394768, 131.24838700038885],
[-32.93141787848973, 129.60524838333367],
[-33.119136183031785, 127.9621097662785],
[-34.57647473521128, 123.13484880018243],
[-33.306854487573844, 126.31897114922332],
[-33.94166461139256, 124.72690997470286],
[-34.57647473521128, 123.13484880018243],
[-34.31710122047667, 121.4406327405925],
[-29.173686234585748, 114.01331789103607],
[-34.35611401722289, 114.54530753813764],
[-35.10544342797745, 117.19741012116424],
[-34.057727705742074, 119.74641668100259],
[-35.10544342797745, 117.19741012116424],
[-34.35611401722289, 114.54530753813764],
[-31.76490012590432, 114.27931271458685],
[-25.32245985988792, 113.61503894644517],
[-29.173686234585748, 114.01331789103607],
[-27.248073047236836, 113.81417841874062],
[-23.1926810582307, 113.46778089834697],
[-25.32245985988792, 113.61503894644517],
[-23.1926810582307, 113.46778089834697],
[-21.707338, 115.001208]]

let data_2 = [[18.9499, 72.9512],
[18.9499, 72.9512],
[15.99945982609702, 72.62816866773392],
[15.99945982609702, 72.62816866773392],
[13.404906136702502, 74.06960462338908],
[13.404906136702502, 74.06960462338908],
[10.948453129999006, 75.47149088384803],
[8.49200012329551, 76.87337714430699],
[8.49200012329551, 76.87337714430699],
[9.912423976891004, 79.47949351499022],
[9.912423976891004, 79.47949351499022],
[12.577719774346027, 80.78549687389665],
[12.577719774346027, 80.78549687389665],
[15.131659887173015, 82.00074843694833],
[17.6856, 83.216]]

const temp_2 = data_2
const temp = data

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

const roadFrom = L.motion.polyline(demoRoute.roadFrom.path, {
    color: "#1eb041",weight:2,dashArray: '1,3'
}, {
    auto: true,
    duration: 5000,
    easing: L.Motion.Ease.easeInOutQuart
}, {
    removeOnEnd: true,
    icon: roadPathIcon,
});
const shippingPath = L.motion.polyline(demoRoute.mainRoute.path, {
    color: "#0ABBF5",weight:2,
    }, {
        duration: 12000,
        easing: L.Motion.Ease.easeInOutQuart
    }, {
        removeOnEnd: true,
        icon: shippingPathIcon,
    });
const roadTo = L.motion.polyline(demoRoute.roadTo.path, {
    color: "#1eb041",weight:2,dashArray: '2,4'
}, {
    duration: 5000,
    easing: L.Motion.Ease.easeInOutQuart
}, {
    removeOnEnd: true,
    icon: roadPathIcon,
});
const airPath = L.motion.polyline(demoRoute.air.path, {
    color: "purple",weight:2,
}, {
    duration: 10000,
    easing: L.Motion.Ease.easeInOutQuart
}, {
    // removeOnEnd: true,
    icon: airIcon,
});
const sqGroup = L.motion.seq([
    roadFrom, shippingPath, roadTo
]);


const Map = ({setAlertInfo,cPorts,countries,airPorts,isClustered,showPath,cRoutes,curLoc, setCurLoc,seaRouteData}) => {
    const [map, setMap] = useState(null);
    console.log(seaRouteData, 'sea');
    // const mb = L.tileLayer.mbTiles('../../data/countries-raster.mbtiles', {
	// 	minZoom: 0,
	// 	maxZoom: 6
	// })
    // const getPortDetails = (feature, layer) => {
    //     layer.bindPopup(ReactDOMServer.renderToString(<Button >+Add to queue</Button>)).click();
    //   }

    // const onEachPortFeature = (feature, layer) => {
    //     layer.on('click', function (e) {
    //         getPortDetails(feature, layer);
    //         this.openPopup();
    //       });
    //     //   layer.on('mouseout', function () {
    //     //     this.closePopup();
    //     //   });
    // }
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
        const div = document.createElement("div");
        div.innerHTML = "+Add to div";
        div.className = 'add-to-queue';
        div.onclick = () =>  {
            setCurLoc((prev) => ([...prev, [latlng.lat,latlng.lng]]))
        }
        return L.circleMarker(latlng, {
            fillColor:feature?.properties?.PORT_NAME ? '#000d37' : '#ff5722',
            color:'#f6f7f9',
            weight:1,
            radius:8,
            fillOpacity:0.95,
        }).bindPopup(div)

    }

    const handleShowPorts = (data) => {
        return <GeoJSON data={data}  pointToLayer={pointToLayer} />
    }

    // const handleClickOnMap = (e) => {
    //     setAlertInfo({text:`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`,severity:'info',duration:5000})        
    // }
    // const customPopup =new  L.Popup(ReactDOMServer.renderToString(<CustomPopup curLoc={curLoc}/>)); 
    
    const whenCreated = (map) => {
        // map.on('contextmenu',(e) => {
        //     console.log('rightclick',e);
        //     customPopup.setLatLng(e.latlng);
        //     map.openPopup(customPopup);
        // });
        setMap(map);
    }
    useEffect(() => {
        if(isClustered) {
            map.flyTo(center,1);
        }
    },[isClustered,map])

    useEffect(() => {
        if(showPath && map) {
            sqGroup.addLayer(airPath, true);
            sqGroup.addTo(map);
        }
        else{
            map?.removeLayer(sqGroup);
        }
    },[showPath,map])

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
            minZoom={1}
            maxZoom={19}
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
                return !sea?.path ? null : (<>
                    <Polyline pathOptions={{color:'black',weight:1,opacity:1}} positions={sea.path} />
                    <CircleMarker center={sea.path[0]} radius={3} fillColor='#000d37' color='#fffff' weight={3}/>
                    <CircleMarker center={sea.path.slice(-1)[0]} radius={3} fillColor='#000d37' weight={3}/>
                </>);
            })}
            {(curLoc && curLoc.length > 0) && <>
                {curLoc.map((point) => {
                    return <CircleMarker center={point} radius={7} fillColor='#000d37' color='cyan' weight={5}/>
                })}
            </>}
            {seaRouteData && seaRouteData.length > 1 && 
                ( <Polyline pathOptions={{fillColor:'cyan',color:'#000d37',weight:1}} positions={seaRouteData}/>)
            }
            <Fullscreen />
        </MapContainer>
    );
}

export default Map;