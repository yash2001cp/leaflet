import React from 'react'
import {CardContent,Typography} from '@mui/material';

const CustomPopup = ({props}) => {
    const {HARBORSIZE,HARBORTYPE,PORT_NAME} = props;
  return (
     <div style={{margin:'-16px -8px -24px'}}>
        <CardContent>
      <Typography variant="h5" component="div">
        {PORT_NAME}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
       Harbor Size : {HARBORSIZE}
      </Typography>
      <Typography variant="body2">
       Harbor type: {HARBORTYPE}
      </Typography>
    </CardContent>
    </div>
  )
}

export default CustomPopup;