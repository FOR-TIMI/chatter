import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import Following from "../../components/Following";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
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

    const serverUrl = process.env.REACT_APP_SERVER_URL || "https://nameless-basin-36851.herokuapp.com/" || "http://localhost:3001/"


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
            <WidgetWrapper>
                <Skeleton width="100%" height={25} style={{ marginBottom: "1.5rem" }} />
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    {Array.from(new Array(3)).map((p,index) => (
                        <FlexBetween key={index}>
                            <FlexBetween gap="1rem">
                                <UserAvatar isLoading={true} size="55px" />
        
                                <Box>
                                    <Skeleton width="150px" height={25} style={{ marginBottom: "0.25rem" }} />
                                    <Skeleton width="75px" height={20} />
                                </Box>
                            </FlexBetween>
                        
                            <FlexBetween>
                                <Skeleton variant="circle" width={30} height={30} style={{ padding: "0.6rem", borderRadius: "50%" }} />
                            </FlexBetween>     
                     </FlexBetween>
                    ))}
                </Box>
            </WidgetWrapper>
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