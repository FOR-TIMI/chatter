import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../../service/config";
import {
  Autocomplete,
  Button,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTheme } from "@emotion/react";

/**Currently you can only send messages to people that follow you */

const NewConversation = ({ isOpen, handleClose }) => {
  // global state
  const token = useSelector((state) => state.token);
  const { _id: userId } = useSelector((state) => state.user);
  const { palette } = useTheme();

  //local state
  const [friendList, setFriendList] = useState(null);
  const [value, setValue] = useState([]);

  //Icons
  const icon = <CircleOutlinedIcon fontSize="large" />;
  const checkedIcon = <CheckCircleIcon fontSize="large" />;
  const closeIcon = <CloseOutlinedIcon fontSize="large" />;

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value);

    //To clear all values
    setValue([]);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(SERVER_URL + `u/${userId}/followers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const friendsData = await response.json();
        setFriendList(friendsData);
      } else {
        console.error("User doesn't exist");
      }
    };

    getFriends();
  }, []);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          backgroundColor: palette.neutral.light,
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.2)",
          padding: "24px",
        }}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            marginLeft="3rem"
            sx={{ textAlign: "center" }}
            flexGrow={9}
            variant="h5"
          >
            New Message
          </Typography>
          <IconButton onClick={handleClose}>{closeIcon}</IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Typography variant="h5">To: </Typography>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={friendList || []}
            getOptionLabel={(option) => option.username}
            value={value}
            onChange={handleChange}
            renderOption={(props, option, { selected }) => (
              <li {...props} style={{ width: "100%" }}>
                <Box
                  sx={{ width: "100%", display: "flex", alignItems: "center" }}
                >
                  <UserAvatar image={option.profilePhotoUrl} size="35px" />

                  <Box margin="0 0.5rem">
                    <Typography variant="h5" fontWeight="500">
                      {option.username.length > 28
                        ? `${option.username.substring(0, 28)}...`
                        : option.username}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ float: "right" }}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                </Box>
              </li>
            )}
            style={{ width: "80%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Followers"
                placeholder="Search..."
              />
            )}
          />
        </Box>
        <Box sx={{ float: "right", marginRight: "1rem" }}>
          <Button type="submit" variant="contained">
            Start conversation
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default NewConversation;
