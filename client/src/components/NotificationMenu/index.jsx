import {useEffect, useState} from 'react'

import { useSelector } from "react-redux";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
    Checkbox,
    Badge,
} from "@mui/material";

import socket from '../../utils/socket'


import {
    Notifications,
    Favorite,
    FavoriteBorder
  } from "@mui/icons-material";

const NotificationMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



 const { palette } = useTheme();
  
  const { newNotification=false, _id} = useSelector((state) => state.user);
  const [isNewNotification, setIsNewNotification] = useState(newNotification)

  const handleChange = (e) => {
    setIsNewNotification(!isNewNotification)
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setIsNewNotification(!isNewNotification)
    setAnchorEl(null);
  };

  const getNotifications = () => {

  }

    useEffect(() => {

        getNotifications()

        if(newNotification){
            setIsNewNotification(true)
        }
        
        socket.on("NEW_NOTIFICATION", () => {
               setIsNewNotification(true)
        })
    })


  return (
    <>

        <Checkbox 
            onChange={handleChange}
            checked={open}
            sx={{
                '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&.Mui-checked': {
                    backgroundColor: 'transparent',

                  },
            }}
            icon={<Badge overlap="circular" color="secondary" variant="dot" invisible={!isNewNotification}> 
                   <FavoriteBorder sx={{ fontSize: "25px" , color: palette.neutral.dark}} />
                  </Badge>}

            checkedIcon={
            <Badge variant="dot" invisible={!isNewNotification}>
                 <Favorite sx={{ fontSize: "25px" , color: palette.neutral.dark}} /> 
            </Badge>
            } 
        />

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    
    </>
  )
}

export default NotificationMenu