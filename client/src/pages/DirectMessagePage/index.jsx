import { Inbox, Telegram, Info } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  // useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Conversation from "../../components/Conversation";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import Message from "../../components/Message";
import Navbar from "../../components/navbar";

const DirectMessagePage = () => {
  const { palette } = useTheme();
  const { light: neutralLight, dark } = palette.neutral;
  const bg = palette.background.alt;

  const { username } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: neutralLight }}>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: `1px solid ${neutralLight}`,
                padding: "10px",
              }}
            >
              <Typography flexGrow={5} variant="h5" fontWeight="500" textAlign="center">
                {username}
              </Typography>

              <IconButton sx onClick={() => navigate("/direct/new")}>
                {palette.mode === "dark" ? (
                  <Inbox sx={{ fontSize: "25px" }} />
                ) : (
                  <Inbox sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
            </Box>

            {/* Conversation list */}
            <Box>
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
        </Box>

        {/* Chat Box */}
        <Box sx={{ flex: 6, backgroundColor: bg, margin: "2rem 0" }}>
          <Box>
            <FlexBetween
              sx={{
                borderBottom: `1px solid ${neutralLight}`,
                padding: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  p: "3px",
                }}
              >
                <UserAvatar
                  image="https://res.cloudinary.com/diskudcr3/image/upload/c_thumb,w_200,g_face/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png"
                  size={32}
                />
                <Typography variant="h5" fontWeight="500">
                  {username}
                </Typography>
              </Box>

              <IconButton onClick={() => navigate("/direct/new")}>
                {palette.mode === "dark" ? (
                  <Info sx={{ fontSize: "25px" }} />
                ) : (
                  <Info sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
            </FlexBetween>
          </Box>
          {/* chatBoxWrapper */}
          <Box sx={{ padding: "10px", height: "100%" }}>
            {/* chatBoxTop */}
            <Box sx={{ height: "80%", overflow: "scroll" }}>
              <Message isAuthor={true}  isLoading={false}/>
              <Message isAuthor={false} isLoading={false} />
              <Message isAuthor={true} isLoading={false} />
              <Message isAuthor={true} isLoading={false} />
              <Message isAuthor={true} isLoading={false} />
              <Message isAuthor={true}  isLoading={false}/>
              <Message isAuthor={true} isLoading={false} />
              <Message isAuthor={true} isLoading={false} />
              <Message isAuthor={true} isLoading={true}/>
              <Message isAuthor={false} isLast={true} />
            </Box>

            {/* charBoxBottom */}
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "0 auto",
                padding: "0.25rem 0.8rem",
                border: `1.5px solid ${palette.neutral.light}`,
                borderRadius: "1.5rem",
              }}
            >
              <FlexBetween
                sx={{
                  p: "0.25rem 0 0.25rem 0.5rem",
                  flexGrow: "1",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "35px",
                }}
              >
                <InputBase
                  size="sm"
                  placeholder="Message…"
                  sx={{ flexGrow: 1, mr: 1 }}
                />

                <IconButton sx={{ "&:hover": { color: palette.primary.dark } }}>
                  <Telegram />
                </IconButton>
              </FlexBetween>
            </Box>
          </Box>
        </Box>

        {/* Chat Online wrapper */}
        {/* <Box sx={{ flex: 3, backgroundColor: bg, margin: "2rem 0" }}> */}
        {/* chatBoxOnlineWrapper */}
        {/* <Box sx={{ padding: "10px", height: "100%" }}>Online</Box>
        </Box>  */}
      </Box>
    </Box>
  );
};

export default DirectMessagePage;
