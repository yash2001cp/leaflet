import {React,useState,useEffect} from 'react'
import {Snackbar,Alert} from '@mui/material'
const Message = ({text, severity,duration}) => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
      setOpen(true);
    }, [text,severity])
    
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={() => setOpen(false)}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
  )
}

export default Message;