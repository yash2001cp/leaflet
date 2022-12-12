
import "./App.css";
import {React,useState} from "react";
import Map from './components/Map'
import Message from "./components/Message";
import {Button,Box,Switch,FormControlLabel} from '@mui/material'

const style = {display:"flex",alignItems:'flex-end',justifyContent:'flex-end',height:'8vh',padding:'1vh',marginRight:'5vw',gap:'1rem'};

function App() {
  const [alertInfo, setAlertInfo] = useState({});
  const [showPorts, setShowPorts] = useState(false);
  const [showPolygons, setShowPolygons] = useState(false);
  const [isClustered, setIsClusterd] = useState(false);

  const handleClick = () => {
    setShowPorts(!showPorts);
    setIsClusterd(!showPorts);
  }
  return (
        <>
        <Box sx={style}>
        {showPorts && 
          <FormControlLabel control={ <Switch
            checked={isClustered}
            label="Cluster ports"
            onChange={() => setIsClusterd(!isClustered)}
          />} label="Cluster ports" />

       }
          <Button variant="outlined" onClick={handleClick}>{showPorts ? 'Hide Ports' :'Show Ports'}</Button>
          <Button variant="outlined" onClick={() => setShowPolygons(!showPolygons)}>{showPolygons ? 'Hide Polygons' :'Show Polygons'}</Button>
          
        </Box>
          <div id="mapId">
          <Map setAlertInfo={setAlertInfo} showPorts={showPorts} showPolygons={showPolygons} isClustered={isClustered}/>
          <Message {...alertInfo}/>
        </div>
        </>
  );
}

export default App;
