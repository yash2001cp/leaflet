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
      L.latLng(12.990842, 80.362759),
      L.latLng(30.707305, 76.877689)
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
    showAlternatives: true,
    createMarker: function (i, pos, n){ 
        console.log('values',pos);
        return L.marker (pos.latLng, {
                draggable: true,
                icon: pointerIcon
        });
    }
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
