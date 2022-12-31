import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Twitter,
    LinkedIn
} from '@mui/icons-material';

import { Box, Typography, Divider, useTheme} from "@mui/material";

//Custom components
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import WidgetWrapper from '../../components/CustomStyledComponents/WidgetWrapper';

import { useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserWidget = ({ username, profilePhotoUrl}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();

    //state
    const token = useSelector((state) => state.token);
    
    //colors
    const { dark, medium, main } = palette.neutral;

    const getUser = async() => {
        const response = await fetch(`http://localhost:3001/u/${username}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const userData = await response.json();

        setUser(userData);
    }

    useEffect(() => {
        getUser();
    },[])

    if(!user){
        return null;
    }

    const { 
            location,
            occupation,
            viewedProfile,
            impressions,
            followingCount,
            followerCount 
            } = user

    return (
        <WidgetWrapper>
           <FlexBetween
               gap="0.5rem"
               pb="1.1rem"
               onClick={() => navigate('/profile')}
           >
               <FlexBetween>
                   <UserAvatar image={profilePhotoUrl} />
                       <Box marginLeft="1rem">
                           <Typography
                               variant='h4'
                               color={dark}
                               fontWeight="500"
                               sx={{
                                   "&:hover": {
                                       color: palette.primary.light,
                                       cursor: "pointer"
                                   }
                               }} 
                           >
                               {username}
                           </Typography>
                           <Typography paddingBottom="0.3rem" color={medium}>
                               {followerCount} followers
                           </Typography>
                           <Typography color={medium}>
                               {followingCount} following
                           </Typography>
                       </Box>
               </FlexBetween>

               <ManageAccountsOutlined/>

              </FlexBetween>

               <Divider/>

               <Box p="1rem 0">
                   <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                       <LocationOnOutlined fontSize='large' sx={{ color: main }}/>
                       <Typography color={medium}>{location}</Typography>
                   </Box>
                   <Box display="flex" alignItems="center" gap="1rem">
                       <WorkOutlineOutlined fontSize="large" sx={{ color: main }}/>
                       <Typography color={medium}>{occupation}</Typography>
                   </Box>
               </Box>

               <Box p="1rem 0">
                   <FlexBetween mb="0.5rem">
                       <Typography color={medium}>Who viewed your profile</Typography>
                       <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                   </FlexBetween>

                   <FlexBetween>
                      <Typography color={medium}>Impressions of your post</Typography>
                       <Typography color={main} fontWeight="500">{impressions}</Typography>
                   </FlexBetween>
               </Box>

               <Box p="1rem 0">
                  <Typography color={main} marginBottom="0.7rem" fontWeight="500">Social Media Profiles</Typography>

                   <FlexBetween gap="1rem" mb="0.5rem">
                       <FlexBetween gap="1rem">
                       <Twitter/>
                           <Box>
                               <Typography color={main} fontWeight="500">
                                   Twitter
                               </Typography>
                               <Typography color={medium}>
                                   Social Media
                               </Typography>
                           </Box>
                       </FlexBetween>
                       <EditOutlined sx={{ color: main}}/>
                   </FlexBetween>

                   <FlexBetween gap="1rem">
                       <FlexBetween gap="1rem">
                           <LinkedIn/>
                           <Box>
                               <Typography color={main} fontWeight="500">
                                   Linkedin
                               </Typography>
                               <Typography color={medium}>
                                   Network
                               </Typography>
                           </Box>
                       </FlexBetween>
                       <EditOutlined sx={{ color: main}}/>
                   </FlexBetween>


               </Box>

        </WidgetWrapper>
      )


}

export default UserWidget