import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputBase, 
         IconButton, 
         useTheme, 
         CircularProgress,
          Box, 
          Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import FlexBetween from '../CustomStyledComponents/FlexBetween';
import { Search } from '@mui/icons-material';
import UserAvatar from '../CustomStyledComponents/UserAvatar';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false)


  const token = useSelector((state) => state.token);

  const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 

  

  const navigate = useNavigate(); 
 
  const handleBlur = async(e) => {
      setTimeout(() => setIsListOpen(false),200)
  };


  const handleClick = async(username,e) => {
    e.preventDefault();  
    navigate(`/profile/${username}`);
    navigate(0);    
  }

  const getSuggestions =async() => {
    
      const responseData = await fetch( 
      serverUrl + `u?searchInput=${searchInput}`,
          {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }    
      );
      if(responseData.ok){
        const data = await responseData.json();
        setLoading(false);
        setSuggestions(data);
      } else{
        setLoading(false);
        setSuggestions([])
      }
  }

  const handleSearchClick = () => {
    if(searchInput.length){
      setIsListOpen(true);
    }
  }
  

  const handleChange = (event) => {
    setLoading(true);
    setSearchInput(event.target.value)
    if(searchInput.trim().length > 0){
     setIsListOpen(true)
    } else{
      setIsListOpen(false)
    }
  };

  


  useEffect(() => { 
    if(isListOpen){
      if(searchInput.trim().length > 0){
        getSuggestions()
      }
    }
  },[searchInput])


  const { palette } = useTheme();
  const { main, medium, light:neutralLight } = palette.neutral;
  const bg = palette.background.alt



  return (
    <Box 
      sx={{
         position: 'relative', 
         display: 'flex', 
         justifyContent: "center"}}>
    <FlexBetween
      backgroundColor={neutralLight}
      borderRadius="9px"
      gap="3rem"
      padding="0.1rem 1.5rem"
    >
     
      <InputBase onBlur={handleBlur} value={searchInput} 
        onChange={handleChange}
        placeholder="Search..."
         />
      <IconButton onClick={handleSearchClick}>
        <Search />
      </IconButton>
    </FlexBetween>

       { isListOpen ? (
            <List
            id="search-list"
              sx={{
              overflow: 'visible',
              position: 'absolute',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              bgcolor: bg,
              mt: 5.8,
              width: "250px",
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
                right: '50%',
                left:'50%',
                width: 10,
                height: 10,
                bgcolor: bg,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              }
            }}
          >
              {
                suggestions.length ? suggestions.map(({ username, profilePhotoUrl, occupation},i) => (
                  <ListItem key={i + username}
                    onClick={(e) => handleClick(username,e)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover':{
                        backgroundColor: neutralLight,
                        borderRadius: '0.8rem'
                      }
                    }}
                  >
                    <FlexBetween gap="1rem">
                    <UserAvatar image={profilePhotoUrl} size="32px" />
                    <Box>
                      <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                      >
                        {username.length > 17 ?`${username.substring(0, 17)}...` : username}
                      </Typography>
                      <Typography color={medium} fontSize="0.75rem">
                        {occupation.length > 17 ?`${occupation.substring(0, 17)}...` : occupation}
                      </Typography>
                    </Box>
                  </FlexBetween>   
                  </ListItem>
                )) : (
                  <ListItem sx={{
                    cursor: 'default',
                    display : "flex",
                    justifyContent: 'center',
                    height: '200px',
                  }} 
                    >{loading ? <CircularProgress/> : 
                    <Typography variant="body2" color="textSecondary">
                    No Results
                  </Typography>}
                </ListItem>
                )
              }
            </List>
           
       ): null
      }
    </Box>
  );
};

export default SearchBar;
