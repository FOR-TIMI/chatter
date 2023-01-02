import { Box, Typography, useTheme } from "@mui/material";
import Following from "../../components/Following";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";


import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { setFollowing } from "../../state";

const FollowingListWidget = ({ username }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();

    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.followings);

    const getFollowings = async () => {
        const response = await fetch(
            `http://localhost:3001/u/${username}/following`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        dispatch(setFollowing({ followings: data }));
    }

    useEffect(() => {
        getFollowings();
    },[])

    
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
                      key={_id}
                      followingId={_id}
                      name={username}
                      subtitle={occupation}
                      userProfilePhotoUrl={profilePhotoUrl}
                      isFollowingList={true}
                    />
                ))}

            </Box>
        </WidgetWrapper>
        )
    }

}

export default FollowingListWidget