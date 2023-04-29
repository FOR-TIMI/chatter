import { Inbox, Info, Telegram } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Conversation from "../../components/Conversation";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import StyledBadge from "../../components/CustomStyledComponents/StyledBadge";
import UserAvatar from "../../components/CustomStyledComponents/UserAvatar";
import Message from "../../components/Message";
import Navbar from "../../components/navbar";

import NewConversation from "../../components/NewConversation";
import { SERVER_URL } from "../../service/config";
import { socket } from "../../service/socket";

const DirectMessagePage = ({ isModal = false }) => {
  const navigate = useNavigate();

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
  const [recievedMessage, setRecievedMessage] = useState(null);
  const [isNewConversation, setIsNewConversation] = useState(isModal);

  //References
  const scrollRef = useRef(null);

  //Colors
  const { palette } = useTheme();
  const { light: neutralLight, dark, medium } = palette.neutral;
  const bg = palette.background.alt;

  useEffect(() => {
    socket.on("getMessage", ({ sender, content }) => {
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
      setMessages((previousMessages) => [...previousMessages, recievedMessage]);
  }, [recievedMessage, currentChat]);

  //For socket join
  useEffect(() => {
    //To add a user to the list of online users
    socket.emit("addUser", userId);

    //To get List of all online users
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await fetch(SERVER_URL + `cs/${userId}`, {
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
  }, [userId, onlineUsers]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(SERVER_URL + `msg/${currentChat?._id}`, {
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
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCurrentChat = (c) => {
    const otherUserId = c?.members.find((m) => m !== userId);

    const getUser = async () => {
      const response = await fetch(SERVER_URL + `u/${otherUserId}`, {
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

  const handleSubmit = async (values, actions) => {
    const { newMessage } = values;

    console.log(actions);

    //To prevent sending empty messages
    if (newMessage.trim().length === 0) {
      return;
    }

    const recieverId = currentChat.members.find((m) => m !== userId);

    socket.emit("sendMessage", {
      sender: userId,
      content: newMessage.trim(),
      recieverId,
    });

    try {
      const response = await fetch(SERVER_URL + `msg`, {
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
      } else {
        console.error("User doesn't exist");
      }
    } catch (err) {
      console.error(err);
    } finally {
      actions.resetForm();
    }
  };

  const handleNewConversation = () => {
    navigate("/direct/new");
    setIsNewConversation(true);
  };

  const handleConversationClose = () => {
    navigate("/direct/inbox");
    setIsNewConversation(false);
  };

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
        <NewConversation
          isOpen={isNewConversation}
          handleClose={handleConversationClose}
        />
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

              <IconButton onClick={handleNewConversation}>
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
                <Formik
                  initialValues={{ newMessage: "" }}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                            name="newMessage"
                            placeholder="Message…"
                            value={values.newMessage}
                            onChange={handleChange}
                            sx={{ flexGrow: 1, mr: 1 }}
                          />

                          <IconButton
                            disabled={isSubmitting}
                            sx={{ "&:hover": { color: palette.primary.dark } }}
                            type="submit"
                            onClick={handleSubmit}
                          >
                            <Telegram />
                          </IconButton>
                        </FlexBetween>
                      </Box>
                    </form>
                  )}
                </Formik>
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

                <Button variant="contained" onClick={handleNewConversation}>
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
