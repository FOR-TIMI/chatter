import {
  EditOutlined,
  LinkedIn,
  LocationOnOutlined,
  ManageAccountsOutlined,
  Twitter,
  WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Divider, Typography, useTheme } from "@mui/material";

//Custom components
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";

import UserWidgetSkeleton from "../../components/Skeletons/UserWidgetSkeleton";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SERVER_URL } from "../../service/config";
import { socket } from "../../service/socket";
import { fShortenNumber } from "../../utils/formatNumber";

const UserWidget = ({ username, profilePhotoUrl }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();

  //state
  const token = useSelector((state) => state.token);

  //colors
  const { dark, medium, main } = palette.neutral;

  const getUser = async () => {
    const response = await fetch(SERVER_URL + `u/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await response.json();

    setUser(userData);
  };

  useEffect(() => {
    // Set up a listener for the ADD_REMOVE_FOLLOWER event
    socket.on("updateFollowers", getUser);

    getUser();
  }, [user]);

  if (!user) {
    return <UserWidgetSkeleton />;
  }

  const {
    location,
    occupation,
    viewedProfile,
    impressions,
    followerCount,
    followingCount,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween>
          <UserAvatar image={profilePhotoUrl} />
          <Box marginLeft="1rem">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/profile")}
            >
              {username}
            </Typography>
            <FlexBetween paddingTop="0.4rem" width="11rem">
              <FlexBetween>
                <Typography color={dark} marginRight="0.25rem">
                  {fShortenNumber(followerCount) || 0}
                </Typography>
                <Typography color={medium}>
                  {followerCount === 1 ? "follower" : "followers"}
                </Typography>
              </FlexBetween>

              <FlexBetween>
                <Typography color={dark}>
                  {fShortenNumber(followingCount) || 0}
                </Typography>
                <Typography color={medium} marginLeft="0.25rem">
                  following
                </Typography>
              </FlexBetween>
            </FlexBetween>
          </Box>
        </FlexBetween>

        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Box p="1rem 0">
        <Typography color={main} marginBottom="0.7rem" fontWeight="500">
          Social Media Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Media</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
