import {React, useState,useEffect} from 'react';
import { MapContainer, TileLayer ,LayersControl,ScaleControl,ZoomControl,GeoJSON,Polyline, CircleMarker, Popup} from 'react-leaflet';
import ReactDOMServer from "react-dom/server";
import 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl';
import LocationButton from '../LocationButton';
import { Button, Tooltip } from '@mui/material';
import cPortJsonData from '../../data/World_Port_Index+(1)+(1).geojson.json';
import jsonData from '../../data.json'
import dots from '../../data/dots.json'
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
import lines from '../../data/lines.json'

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

const customPath =[[17.1, 73.08333333300011], [16.5, 73.08333333300011], [15.900000000000002, 73.08333333300011], [15.3, 73.08333333300011], [14.700000000000001, 73.08333333300011], [14.100000000000001, 73.08333333300011], [13.500000000000002, 73.08333333300011], [12.900000000000002, 73.08333333300011], [12.300000000000002, 73.08333333300011], [11.700000000000003, 73.6833333330001], [11.100000000000003, 74.2833333330001], [10.500000000000004, 74.8833333330001], [9.900000000000004, 75.48333333300009], [9.300000000000004, 76.08333333300008], [8.700000000000005, 76.68333333300008], [8.100000000000005, 77.28333333300007], [8.100000000000005, 77.88333333300007], [8.100000000000005, 78.48333333300006], [8.700000000000005, 79.08333333300006], [9.300000000000004, 79.68333333300005], [9.900000000000004, 80.28333333300004], [9.900000000000004, 80.88333333300004], [9.900000000000004, 81.48333333300003], [9.900000000000004, 82.08333333300003], [9.900000000000004, 82.68333333300002], [9.900000000000004, 83.28333333300002], [9.900000000000004, 83.88333333300001], [9.900000000000004, 84.483333333], [9.900000000000004, 85.083333333], [9.900000000000004, 85.683333333], [9.900000000000004, 86.28333333299999], [9.900000000000004, 86.88333333299998], [9.900000000000004, 87.48333333299998], [9.900000000000004, 88.08333333299997], [9.900000000000004, 88.68333333299996], [9.900000000000004, 89.28333333299996], [9.900000000000004, 89.88333333299995], [9.900000000000004, 90.48333333299995], [10.500000000000004, 91.08333333299994], [11.100000000000003, 91.68333333299994], [11.700000000000003, 92.28333333299993], [12.300000000000002, 92.88333333299992], [12.900000000000002, 93.48333333299992], [13.500000000000002, 94.08333333299991], [14.100000000000001, 94.68333333299991], [14.700000000000001, 95.2833333329999], [15.3, 95.8833333329999], [15.900000000000002, 96.48333333299989], [16.5, 97.08333333299989]];


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


const Map = ({setAlertInfo,cPorts,countries,airPorts,isClustered,showPath,cRoutes,curLoc, setCurLoc,seaRouteData,showGrid,advancedRoutes}) => {
    const [map, setMap] = useState(null);
    console.log(advancedRoutes, 'advanced');
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
        div.innerHTML = `${latlng.lat}, ${latlng.lng} <br/> +Add to queue`;
        div.className = 'add-to-queue';
        div.onclick = () =>  {
            setCurLoc((prev) => ([...prev, [latlng.lat,latlng.lng]]))
            map.closePopup();
        }
        return L.circleMarker(latlng, {
            fillColor:feature?.properties?.PORT_NAME ? '#000d37' : '#ff5722',
            color:'#f6f7f9',
            weight:1,
            radius:7,
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
    const handleShowGrid = () => {
        lines.map((line,i) => {
            line.map((pt,j) => {
                const div = document.createElement("div");
                div.innerHTML = `${pt[0]}, ${pt[1]} <br/> +Add to queue`;
                div.className = 'add-to-queue';
                div.onclick = () =>  {
                    setCurLoc((prev) => ([...prev, [i,j]]))
                    map.closePopup();
                }
                L.circleMarker(pt, {
                    fillColor: dots[i][j] ? 'red' : 'blue',
                    color:'#f6f7f9',
                    color:'black',
                    weight:1,
                    radius:3,
                    fillOpacity:0.65,
                }).bindPopup(div).addTo(map);
            })
        })
    }
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
            {/* {
                jsonData.map((item) => {
                    const path = [item.origin,item.destination];
                    return <Polyline pathOptions={{color:'#000d37',weight:1}} positions={path}/>
                })
            } */}
            {cRoutes && routes.map(({sea}) => {
                return !sea?.path ? null : (<>
                    <Polyline pathOptions={{color:'black',weight:1,opacity:1}} positions={sea.path} />
                    <CircleMarker center={sea.path[0]} radius={3} fillColor='#000d37' color='#fffff' weight={3}/>
                    <CircleMarker center={sea.path.slice(-1)[0]} radius={3} fillColor='#000d37' weight={3}/>
                </>);
            })}
            {(curLoc && curLoc.length > 0) && <>
                {curLoc.map((point) => {
                    return <CircleMarker center={lines[point[0]][point[1]]} radius={5} fillColor='#000d37' color='cyan' weight={3}/>
                })}
            </>}
            {seaRouteData && seaRouteData.length > 0 && <>
                {seaRouteData.map((route) => {
                    return route && route.length > 1 ? <>
                         <Polyline pathOptions={{color:'#000d37',weight:1}} positions={route}/> 
                    </> : null;
                })}

            </>
            }
            {advancedRoutes && advancedRoutes.length > 0 && <>
                {advancedRoutes.map((route) => {
                    return route && route.length > 1 ? <>
                         <Polyline pathOptions={{color:'purple',weight:4}} positions={route}/> 
                    </> : null;
                })}

            </>
            }
            {/* <Polyline positions={customPath}/> */}
            {/* {
              showGrid &&  lines.map((line,i) => {
                  return <>
                  {line.map((point,j)=> {
                        return <CircleMarker center={point} radius={4} fillColor= {dots[i][j] ? 'red' : 'black'} fillOpacity={1} weight={1}>
                            <Popup>
                                {`${point[0]}, ${point[1]}, --> ${i},${j}`}
                            </Popup>
                        </CircleMarker>
                        
                    })}
                  </>
                })
            }         */}
            {
                showGrid && handleShowGrid()
            }
            <Fullscreen />
        </MapContainer>
    );
}

export default Map;