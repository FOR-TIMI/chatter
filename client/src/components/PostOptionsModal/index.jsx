import { List, ListItem, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../service/config";
import EditPostModal from "../EditPostModal";

const PostOptionsModal = ({ open, setOpen, postId }) => {
  const handleClose = () => setOpen(false);
  const { palette } = useTheme();

  const [post, setPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { light: neutralLight, dark, medium } = palette.neutral;
  const bg = palette.background.alt;
  const navigate = useNavigate();

  //token
  const token = useSelector((state) => state.token);

  //To get post
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(SERVER_URL + `p/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const post = await res.json();
      setPost(post);
    };

    getPost();
  }, []);

  const handleEditClick = async () => {
    setIsEditModalOpen(true);
  };

  //To delete a post
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(SERVER_URL + `p/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate(0);
      }
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
      {isEditModalOpen && (
        <EditPostModal
          open={isEditModalOpen}
          setOpen={setIsEditModalOpen}
          post={post}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <List
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "15px",
            width: 400,
            bgcolor: bg,
            boxShadow: 24,
            paddingY: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <ListItem
            sx={{
              borderTop: `1px solid ${medium}`,
              borderBottom: `1px solid ${medium}`,
              width: "100%",
              textAlign: "center",
            }}
            onClick={handleDeleteClick}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#ff0000",
                textAlign: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Delete
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              borderTop: `1px solid ${medium}`,
              borderBottom: `1px solid ${medium}`,
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
            }}
            onClick={handleEditClick}
          >
            <Typography
              variant="h5"
              sx={{
                color: palette.primary.dark,
              }}
            >
              Edit
            </Typography>
          </ListItem>
        </List>
      </Modal>
    </>
  );
};

export default PostOptionsModal;
