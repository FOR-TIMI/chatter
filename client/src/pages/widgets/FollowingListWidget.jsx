import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";

import Following from "../../components/Following";

import FollowingListSkeleton from "../../components/Skeletons/FollowingListSkeleton";
import { useState } from "react";


import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { setFollowing, setFollowers } from "../../state";

const FollowingListWidget = ({ username , isProfile=false }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();

    const [isLoading, setIsLoading] = useState(true);

    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 



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

    const getFollowers = async () => {
            const response = await fetch(
              serverUrl + `u/${username}/followers`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setIsLoading(false)
        dispatch(setFollowers({ followers: data }));
    }

    useEffect(() => {
        getFollowings();
        getFollowers();
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
                {!isProfile ? 'People you follow' : `People ${username} follows`}
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