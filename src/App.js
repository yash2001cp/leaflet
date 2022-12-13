
import "./App.css";
import {React,useState} from "react";
import Map from './components/Map'
import Message from "./components/Message";
import {Box,Switch,FormControlLabel} from '@mui/material'

const style = {display:"flex",alignItems:'flex-end',justifyContent:'flex-end',height:'8vh',padding:'1vh',marginRight:'5vw',gap:'1rem'};

function App() {
  const [alertInfo, setAlertInfo] = useState({});
  const [showCPorts, setShowCPorts] = useState(false);
  const [showAirPorts, setShowAirPorts] = useState(false);
  const [showPolygons, setShowPolygons] = useState(false);
  const [isClustered, setIsClusterd] = useState(false);

  return (
        <>
        <Box sx={style}>
        {(showCPorts || showAirPorts) && 
          <FormControlLabel control={ <Switch
            checked={isClustered}
            onChange={() => setIsClusterd(!isClustered)}
          />} label="Cluster ports" />

       }
          <FormControlLabel control={ <Switch
          sx={{color:"#000d37"}}
            checked={showCPorts}
            color="info"
            onChange={() => setShowCPorts(!showCPorts)}
          />} label="Sea Ports" />
           <FormControlLabel control={ <Switch
            checked={showAirPorts}
            color="warning"
            onChange={() => setShowAirPorts(!showAirPorts)}
          />} label="Air Ports" />
         
         <FormControlLabel control={ <Switch
            checked={showPolygons}
            onChange={() => setShowPolygons(!showPolygons)}
          />} label="Countries Polygon" />
        </Box>
          <div id="mapId">
          <Map setAlertInfo={setAlertInfo} cPorts={showCPorts} airPorts={showAirPorts} countries={showPolygons} isClustered={isClustered}/>
          <Message {...alertInfo}/>
        </div>
        </>
  );
}

export default App;
