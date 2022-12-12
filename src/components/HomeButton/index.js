import {useEffect} from 'react'
import {  useMapEvent } from "react-leaflet";
import L from 'leaflet';
import './index.css'

const HomeButton = ({ map,curLocation }) => {
    console.log(map,'map');
  useMapEvent({
    dragend() {
      const { lat: latD, lng: lngD } = map.getCenter();
      const { lat, lng } = map.getCenter();

      const checkEqualArrays =
        [lat, lng] !== [latD.toFixed(5) * 1, lngD.toFixed(5) * 1];

      document.body.classList[checkEqualArrays ? "add" : "remove"](
        "show-button-home"
      );
    },
  });

  useEffect(() => {
    if (!map) return;

    const customControler = L.Control.extend({
      options: {
        position: "topleft",
      },

      onAdd: function () {
        const btn = L.DomUtil.create("button", "back-to-home locateButton leaflet-bar");
        btn.title = "loc-btn";
        btn.innerHTML =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>';

        btn.onclick = function () {
          map.flyToBounds([curLocation]);
          document.body.classList.remove("show-button-home");
        };

        return btn;
      },
    });

    map.addControl(new customControler());

  }, [map]);

  return null;
};

export default HomeButton;