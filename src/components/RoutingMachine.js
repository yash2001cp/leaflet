import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import pin from '../data/pin.png';
const pointerIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [16, 16], 
    iconAnchor: [8, 13], 
    popupAnchor: [0, -10],
  });
const createRoutingMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng( 32.646207, -16.916705),
      L.latLng( 32.863889,-17.176719)
    ],
    lineOptions: {
        styles: [
          {color: '#022bb1', opacity: 0.8, weight: 6},
          {color: 'white', opacity: 0.3, weight: 4}
        ]
      },
      altLineOptions: {
        styles: [
          {color: '#40007d', opacity: 0.4, weight: 6},
          {color: 'black', opacity: 0.5, weight: 2, dashArray: '2,4' },
          {color: 'white', opacity: 0.3, weight: 4}
        ]
      },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    summaryTemplate: '<div class="osrm-directions-summary"><h2>{name}</h2><h3>{distance}, {time}</h3></div>',
    createMarker: function (i, pos, n){ 
        console.log('values',pos);
        return L.marker (pos.latLng, {
                draggable: true,
                icon: pointerIcon
        });
    }
  });
  instance.on('routesfound', function (e) {
    const roadTo = e.routes[0].coordinates.map((latlng) => {
      return [latlng.lat,latlng.lng];
    });
      // const element = document.createElement("a");
      // const textFile = new Blob([JSON.stringify(roadTo)], {type: 'text/plain'}); //pass data from localStorage API to blob
      // element.href = URL.createObjectURL(textFile);
      // element.download = "userFile.txt";
      // document.body.appendChild(element); 
      // element.click();
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
