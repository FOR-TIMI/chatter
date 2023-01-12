import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FlagIcon from '@mui/icons-material/Flag';

import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';

export default function AccountMenu({ username, profilePhotoUrl}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { palette } = useTheme();

  const grey = palette.grey

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: "3rem" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar alt={username} src={profilePhotoUrl} sx={{ width: 40, height: 40 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          width: "100%"
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
           onClick={() => navigate('/profile')}> 
           <ListItemIcon>        
             <PersonOutlineIcon sx={{  marginRight: "1rem", color : grey, fontSize: "1.3rem"}}/>
          </ListItemIcon>
           Profile
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
        > 
        <ListItemIcon>
          <BookmarkBorderIcon fontSize="medium" sx={{ marginRight: "1rem", color : grey }}/> 
        </ListItemIcon>
        Saved
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
           sx={{width: "13rem", fontSize: "0.9rem" ,padding: "0.6rem 1rem"}}
        >
          <ListItemIcon>
            <FlagIcon fontSize="medium" />
          </ListItemIcon>
            Report Problem
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => dispatch(setLogout())}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
