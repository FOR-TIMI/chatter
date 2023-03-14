import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../../utils/formatDate";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

const Conversation = ({ conversation, currentUser }) => {
  //   profilePhotoUrl, username, lastMessage, createdAt
  const serverUrl =
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:3001/"
      : process.env.REACT_APP_SERVER_URL;
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation?.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const response = await fetch(serverUrl + `u/${otherUserId}`, {
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
  }, [currentUser, conversation, serverUrl, token]);

  const { palette } = useTheme();
  const { medium } = palette.neutral;

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
        <UserAvatar image={user?.profilePhotoUrl} size="35px" />
        <Box flexGrow={3.5} margin="0 0.5rem">
          <Typography variant="h5" fontWeight="500">
            {user?.username.length > 28
              ? `${user?.username.substring(0, 28)}...`
              : user?.username}
          </Typography>

       {/**    <Box sx={{ display: "flex", gap: 1 }}>
            <Typography color={medium} fontSize="0.75rem">
              {user?.lastMessage.length > 28
                ? `${user?.lastMessage.substring(0, 28)}... `
                : `${user?.lastMessage}`}
            </Typography>

            <Typography fontSize="0.75rem">
              {`.${formatTime(user?.createdAt)}`}
            </Typography>
              </Box> **/}
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Conversation;
