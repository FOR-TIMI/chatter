import { Inbox, Telegram, Info } from "@mui/icons-material";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  // useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Conversation from "../../components/Conversation";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import Message from "../../components/Message";
import Navbar from "../../components/navbar";
import { v4 as uuidv4 } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import StyledBadge from "../../components/CustomStyledComponents/StyledBadge";

const DirectMessagePage = () => {
  const navigate = useNavigate();

  const serverUrl =
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:3001/"
      : process.env.REACT_APP_SERVER_URL;

  const socketUrl =
    process.env.REACT_APP_ENV === "Development"
      ? "ws://localhost:3002/"
      : process.env.REACT_APP_SERVER_URL;

  // global state
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const { username, _id: userId } = user;

  //local state
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConvo, setCurrentConvo] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState(null);

  //References
  const socket = useRef(io(socketUrl));
  const scrollRef = useRef();

  //Colors
  const { palette } = useTheme();
  const { light: neutralLight, dark, medium } = palette.neutral;
  const bg = palette.background.alt;

  useEffect(() => {
    socket.current = io(socketUrl);
    socket.current.on("getMessage", ({ sender, content }) => {
      setRecievedMessage({
        sender,
        content,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    recievedMessage &&
      currentChat?.members.includes(recievedMessage.sender) &&
      setMessages((previosMessages) => [...previosMessages, recievedMessage]);
  }, [recievedMessage, currentChat]);

  //For socket join
  useEffect(() => {
    //To add a user to the list of online users
    socket.current.emit("addUser", userId);

    //To get List of all online users
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(serverUrl + `cs/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          data.forEach((d) => {
            const otherUserId = d.members.find((m) => m !== userId);
            d.isOnline = onlineUsers.some(
              (user) => user.userId === otherUserId
            );
          });

          setConversations(data);
        }
      } catch (err) {
        console.err(err);
      }
    };
    getConversations();
  }, [currentChat, token, serverUrl, userId, onlineUsers]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(serverUrl + `msg/${currentChat?._id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (err) {
        console.err(err);
      }
    };

    getMessages();
  }, [currentChat, serverUrl, token]);

  const handleCurrentChat = (c) => {
    const otherUserId = c?.members.find((m) => m !== userId);

    const getUser = async () => {
      const response = await fetch(serverUrl + `u/${otherUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        setCurrentConvo(userData);
      } else {
        console.error("User doesn't exist");
      }
    };

    getUser();
    setCurrentChat(c);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //To prevent sending empty messages
    if (newMessage.trim().length === 0) {
      return;
    }

    const recieverId = currentChat.members.find((m) => m !== userId);

    socket.current.emit("sendMessage", {
      sender: userId,
      content: newMessage.trim(),
      recieverId,
    });

    try {
      const response = await fetch(serverUrl + `msg`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          content: newMessage.trim(),
          conversationId: currentChat._id,
        }),
      });

      if (response.ok) {
        const message = await response.json();

        setMessages([...messages, message]);
        setNewMessage("");
      } else {
        console.error("User doesn't exist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box m={0} p={0} sx={{ backgroundColor: neutralLight, overflow: "hidden" }}>
      <Navbar />
      <Box
        sx={{
          height: "calc(100vh - 60px)",
          width: "80%",
          margin: "0 auto",
          padding: "2rem 0",
          display: "flex",
          justifyContent: "flex-end",
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: `1px solid ${neutralLight}`,
                padding: "10px",
              }}
            >
              <Typography
                flexGrow={5}
                variant="h5"
                fontWeight="500"
                textAlign="center"
              >
                {username}
              </Typography>

              <IconButton onClick={() => navigate("/direct/new")}>
                {palette.mode === "dark" ? (
                  <Inbox sx={{ fontSize: "25px" }} />
                ) : (
                  <Inbox sx={{ fontSize: "25px", color: dark }} />
                )}
              </IconButton>
            </Box>

            {/* Conversation list */}
            <Box sx={{ overflowY: "scroll" }}>
              {conversations?.map((c) => (
                <Box key={uuidv4()} onClick={() => handleCurrentChat(c)}>
                  <Conversation currentUser={user} conversation={c} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Chat Box */}
        <Box sx={{ flex: 6, backgroundColor: bg, margin: "2rem 0" }}>
          {currentChat ? (
            <>
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
                    {currentConvo?.isOnline ? (
                      <Stack direction="row" spacing={2}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <UserAvatar
                            image={currentConvo?.profilePhotoUrl}
                            size="35px"
                          />
                        </StyledBadge>
                      </Stack>
                    ) : (
                      <UserAvatar
                        image={currentConvo?.profilePhotoUrl}
                        size="35px"
                      />
                    )}

                    <Typography variant="h5" fontWeight="500">
                      {currentConvo?.username}
                    </Typography>

                    {currentConvo?.isOnline && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography fontSize="0.75rem">Active now</Typography>
                      </Box>
                    )}
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
                <Box sx={{ height: "80%", overflowY: "scroll", width: "100%" }}>
                  {messages.map((m, i) => (
                    <div key={uuidv4()} ref={scrollRef}>
                      <Message
                        isLast={i === messages.length - 1}
                        profilePhoto={currentConvo?.profilePhotoUrl}
                        isAuthor={m.sender === userId}
                        message={m}
                      />
                    </div>
                  ))}
                </Box>

                {/* charBoxBottom */}
                <form onSubmit={handleSubmit}>
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
                        value={newMessage}
                        onChange={handleInputChange}
                        sx={{ flexGrow: 1, mr: 1 }}
                      />

                      <IconButton
                        sx={{ "&:hover": { color: palette.primary.dark } }}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <Telegram />
                      </IconButton>
                    </FlexBetween>
                  </Box>
                </form>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <SendIcon fontSize="large" />
                  <Typography variant="h3">Your Messages</Typography>

                  <Typography variant="h5" color={medium}>
                    Send private messages to a friend
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => navigate("/direct/new")}
                >
                  Send Message
                </Button>
              </Box>
            </>
          )}
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
