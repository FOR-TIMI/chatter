import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";

import Following from "../../components/Following";

import FollowingListSkeleton from "../../components/Skeletons/FollowingListSkeleton";
import { useState } from "react";


import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { setFollowing } from "../../state";

const FollowingListWidget = ({ username }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();

    const [isLoading, setIsLoading] = useState(true);

    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    const serverUrl =  "http://localhost:3001/" || "https://nameless-basin-36851.herokuapp.com/" || process.env.REACT_APP_SERVER_URL 



    const getFollowings = async () => {
        const response = await fetch(
             serverUrl + `u/${username}/following`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setIsLoading(false)
        dispatch(setFollowing({ followings: data }));
    }

    useEffect(() => {
        getFollowings();
    },[])

    if(isLoading){
        return (
          <FollowingListSkeleton/>
        )
    }


  if(followings.length){
    return (
        <WidgetWrapper>
            <Typography
              color={palette.neutral.dark}
              variant="h5"
              fontWeight="500"
              sx={{ mb: "1.5rem" }}
            >
                People you follow
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
                {followings.map(({ 
                 _id, 
                 username,
                 occupation,
                 profilePhotoUrl,
                }) => (
                    <Following
                      key={_id + username}
                      followingId={_id}
                      name={username}
                      subtitle={occupation}
                      userProfilePhotoUrl={profilePhotoUrl}
                    />
                ))}

            </Box>
        </WidgetWrapper>
    )
  }

  return;
    
}

export default FollowingListWidget