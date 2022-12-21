
import "./App.css";
import {React,useState,useEffect} from "react";
import Map from './components/Map'
import Message from "./components/Message";
import {Box,Switch,FormControlLabel,Button} from '@mui/material'
import seaRoutes from './data/seaRoutes.json'
const style = {display:"flex",alignItems:'flex-end',justifyContent:'flex-end',height:'8vh',padding:'1vh',marginRight:'5vw',gap:'1rem'};
const axios = require('axios');

const url = 'https://1c1e-103-143-39-118.in.ngrok.io/';
function App() {
  const [alertInfo, setAlertInfo] = useState({});
  const [showCPorts, setShowCPorts] = useState(false);
  const [showAirPorts, setShowAirPorts] = useState(false);
  const [showPolygons, setShowPolygons] = useState(false);
  const [isClustered, setIsClusterd] = useState(false);
  const [showPath, setShowPath] = useState(false);
  const [showCRoutes, setShowCRoutes] = useState(false);
  const [curLoc, setCurLoc] = useState([]);
  const [seaRouteData, setSeaRouteData] = useState([]);


  // const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  // const handleChange = () => {
  //   if(!isDeveloperMode) {
  //     setIsDeveloperMode([]);
  //   }
  //   else setIsDeveloperMode(null);
  // }
  // const handleSave = () => {
  //   const element = document.createElement("a");
  //   const textFile = new Blob([JSON.stringify(isDeveloperMode)], {type: 'text/plain'}); 
  //   element.href = URL.createObjectURL(textFile);
  //   element.download = `customRoute${new Date()}.txt`;
  //   document.body.appendChild(element); 
  //   element.click();
  // }
  const getRouteData = async () => {
    try {
        const resp = await axios.get(url,{
          params: {
            points: curLoc,
          }
        });
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

  const handleGetRoute = () => {
    if(curLoc.length < 2) {
      setAlertInfo({text:"Please choose at least 2 routes",severity:"warning",duration:1000})
    }
    else getRouteData();
  }
  return (
        <>
        <Box sx={style}>
        {showCPorts && <>
          <Button variant="contained" onClick={handleGetRoute}>
            Get Route
          </Button>
          <Button onClick={() => setCurLoc([])}>Clear Route</Button>
          
        </>
          }
        
        
        <FormControlLabel className={showPath ? 'active-path': null} control={ <Switch
            checked={showPath}
            color="secondary"
            onChange={() => setShowPath(!showPath)}
          />} label="demo Path" />
        {(showCPorts || showAirPorts) && 
          <FormControlLabel control={ <Switch
            checked={isClustered}
            onChange={() => setIsClusterd(!isClustered)}
          />} label="Cluster ports" />

       }
          <FormControlLabel className={showCPorts ? 'active-seaport': null} control={ <Switch
            checked={showCPorts}
            color="info"
            onChange={() => setShowCPorts(!showCPorts)}
          />} label="Sea Ports" />
          <FormControlLabel className={showCRoutes ? 'active-seaport': null} control={ <Switch
            checked={showCRoutes}
            color="info"
            onChange={() => setShowCRoutes(!showCRoutes)}
          />} label="Sea Routes" />
           <FormControlLabel className={showAirPorts ? 'active-airport': null} control={ <Switch
            checked={showAirPorts}
            color="warning"
            onChange={() => setShowAirPorts(!showAirPorts)}
          />} label="Air Ports" />
         
         <FormControlLabel  control={ <Switch
            checked={showPolygons}
            onChange={() => setShowPolygons(!showPolygons)}
          />} label="Countries Polygon" />
        </Box>
          <div id="mapId">
          <Map setAlertInfo={setAlertInfo} cPorts={showCPorts} airPorts={showAirPorts} countries={showPolygons} isClustered={isClustered} showPath={showPath} cRoutes={showCRoutes} curLoc={curLoc} setCurLoc={setCurLoc} seaRouteData={seaRouteData}/>
          <Message {...alertInfo}/>
        </div>
        </>
  );
}

export default App;
