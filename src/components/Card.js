import React from 'react'
import {CardContent,Typography} from '@mui/material';

const CustomPopup = ({props}) => {
    const {HARBORSIZE,HARBORTYPE,PORT_NAME,nameshort,namelong,aptclass,apttype,city,country} = props;
  return (
     <div style={{margin:'-16px -8px -24px'}}>
        <CardContent>
      <Typography variant="h5" component="div">
        {PORT_NAME || nameshort || namelong}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       {HARBORSIZE ? `Harbor Size : ${HARBORSIZE}` : `${city || ''} , ${country}`}
      </Typography>
      <Typography variant="body2">
       {HARBORTYPE ? `Harbor type: ${HARBORTYPE}` : `${aptclass || ''} - ${apttype}`}
      </Typography>
    </CardContent>
    </div>
  )
}

export default CustomPopup;