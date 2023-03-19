import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

import { SERVER_URL } from "../../service/config";

import StyledBadge from "../CustomStyledComponents/StyledBadge";

const Conversation = ({ conversation, currentUser }) => {
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState(null);

  // To get the other user in the conversation
  useEffect(() => {
    const otherUserId = conversation?.members.find(
      (m) => m !== currentUser._id
    );

    const getUser = async () => {
      const response = await fetch(SERVER_URL + `u/${otherUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        setUser(userData);
      } else {
        console.error("User doesn't exist");
      }
    };

    getUser();
  }, []);

  const { palette } = useTheme();

  return (
    <Box
      padding="0.5rem 0.5rem"
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: palette.neutral.main,
        },
      }}
    >
      <FlexBetween margin="0.75rem">
        {conversation.isOnline ? (
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <UserAvatar image={user?.profilePhotoUrl} size="35px" />
            </StyledBadge>
          </Stack>
        ) : (
          <UserAvatar image={user?.profilePhotoUrl} size="35px" />
        )}

        <Box flexGrow={3.5} margin="0 0.5rem">
          <Typography variant="h5" fontWeight="500">
            {user?.username.length > 28
              ? `${user?.username.substring(0, 28)}...`
              : user?.username}
          </Typography>

          {conversation.isOnline && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography fontSize="0.75rem">Active now</Typography>
            </Box>
          )}
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Conversation;
