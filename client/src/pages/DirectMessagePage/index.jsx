import { Inbox } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  // useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Conversation from "../../components/Conversation";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Navbar from "../../components/navbar";

const DirectMessagePage = () => {
  const { palette } = useTheme();
  const { light: neutralLight, dark } = palette.neutral;
  const bg = palette.background.alt;

  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: neutralLight, height: "100%" }}>
      <Navbar />
      <Box
        sx={{
          height: "calc(100vh - 70px)",
          width: "80%",
          margin: "0 auto",
          display: "flex",
        }}
      >
        {/* Chat Menu */}
        <Box
          sx={{
            flex: 3.5,
            backgroundColor: bg,
            margin: "2rem 0",
            borderRight: `1px solid ${neutralLight}`,
          }}
        >
          {/* chatMenuWrapper */}
          <Box sx={{ height: "100%" }}>
            <FlexBetween sx={{ borderBottom: `1px solid ${neutralLight}` , padding : '10px'}}>
              <Typography
                variant="h5"
                fontWeight="500"
              >
                {username.toUpperCase()}
              </Typography>

              <IconButton onClick={() => navigate("/direct/new")}>
                {palette.mode === "dark" ? (
                  <Inbox sx={{ fontSize: "25px" }} />
                ) : (
                  <Inbox sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
            </FlexBetween>

            <Conversation
              createdAt="2023-03-12T23:45:17.195Z"
              lastMessage="i love dogs soooo fraking much"
              profilePhotoUrl="https://res.cloudinary.com/diskudcr3/image/upload/c_thumb,w_200,g_face/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png"
              username="for-timi"
            />
            <Conversation
              createdAt="2023-03-12T23:45:17.195Z"
              lastMessage="i love dogs soooo fraking much"
              profilePhotoUrl="https://res.cloudinary.com/diskudcr3/image/upload/c_thumb,w_200,g_face/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png"
              username="for-timi"
            />
            <Conversation
              createdAt="2023-03-12T23:45:17.195Z"
              lastMessage="i love dogs soooo fraking much"
              profilePhotoUrl="https://res.cloudinary.com/diskudcr3/image/upload/c_thumb,w_200,g_face/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png"
              username="for-timi"
            />
          </Box>
        </Box>

        {/* Chat Box */}
        <Box sx={{ flex: 5.5, backgroundColor: bg, margin: "2rem 0" }}>
          {/* chatBoxWrapper */}
          <Box sx={{ padding: "10px", height: "100%" }}>Box</Box>
        </Box>

        {/* Chat Online wrapper */}
        <Box sx={{ flex: 3, backgroundColor: bg, margin: "2rem 0" }}>
          {/* chatBoxOnlineWrapper */}
          <Box sx={{ padding: "10px", height: "100%" }}>Online</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DirectMessagePage;
