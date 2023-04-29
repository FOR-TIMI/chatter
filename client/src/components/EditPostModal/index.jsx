import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";

import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../../service/config";
import { setPost } from "../../state";
import { editPostSchema } from "../../utils/Schemas";
import UserAvatar from "../CustomStyledComponents/UserAvatar";
import SwiperWithPagination from "../SwiperWithPagination";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EditPostModal = ({ open = false, setOpen, post }) => {
  const handleClose = () => setOpen(false);

  /** Global state variables */
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  /** Local state */
  const [deletedImages, setDeletedImages] = useState([]);

  const [postImages, setPostImages] = useState(post.postImageUrls);
  const [newImages, setNewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  /**Local variables */
  const { userProfilePhoto, username, _id } = post;

  /**Colors */
  const { palette } = useTheme();

  const addDeletedImage = (id) => {
    const findImage = (img) => img._id === id;

    const isExists = Boolean(deletedImages.find(findImage));
    const image = postImages.find(findImage);

    if (!isExists) {
      setDeletedImages((prevImages) => [...prevImages, image]);
    } else {
      const newImages = deletedImages.filter((img) => img._id !== id);
      setDeletedImages(newImages);
    }
  };

  const handleSave = async ({ caption, location }) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    if (deletedImages.length) {
      deletedImages.forEach((image) => {
        formData.append("deletedImages", JSON.stringify(image));
      });
    }

    if (newImages.length) {
      newImages.forEach((image) => {
        formData.append("newPostImages", image);
      });
    }

    const response = await fetch(`${SERVER_URL}p/${_id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));

    setLoading(false);

    setDeletedImages([]);
    setNewImages([]);
  };

  const handleSubmit = async (values, actions) => {
    try {
      setLoading(true);
      await editPostSchema.validate(
        {
          caption: values.caption,
          images: newImages,
          location: values.location,
        },
        { abortEarly: false }
      );

      handleSave(values);
    } catch (err) {
      console.log(err);
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
    } finally {
      actions.resetForm();
      handleClose();
    }
  };

  const {
    getRootProps,
    getInputProps,
    open: openFileDialog,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (postImages.length + acceptedFiles.length > 5) {
        alert("Maximum of 5 images allowed");
        return;
      }

      const id = uuid();
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
          filename: id,
          _id: id,
        })
      );

      setNewImages([...newImages, newImages]);
      const newPostImages = newImages.map(({ url, _id, filename }) => ({
        url,
        filename,
        _id,
      }));
      setPostImages([...postImages, ...newPostImages]);
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {postImages.length > 0 && (
            <Box sx={{ width: "50%" }}>
              <SwiperWithPagination
                images={postImages}
                addDeletedImage={addDeletedImage}
              />
            </Box>
          )}
          <Formik
            initialValues={{
              location: post.location,
              caption: post.caption,
            }}
            validationSchema={editPostSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {/** Profile Image and username section */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      margin: "1rem 0 2rem 0",
                    }}
                  >
                    <UserAvatar image={userProfilePhoto} size="32px" />
                    {username}
                  </Box>

                  {/** Location section */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    marginBottom="1rem"
                  >
                    <TextField
                      label="location"
                      placeholder="location"
                      variant="standard"
                      name="location"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.location}
                      sx={{ flexGrow: 5 }}
                    />
                    {errors.location && touched.location && (
                      <Typography
                        sx={{ fontSize: "0.69rem" }}
                        variant="small"
                        color="error"
                      >
                        {errors.location}
                      </Typography>
                    )}
                  </Box>

                  {/** Caption section */}
                  <Box
                    sx={{
                      marginBottom: "1rem",
                      display: "flex",
                      gap: 1,
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      label="caption"
                      multiline
                      rows={4}
                      name="caption"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.caption}
                      variant="standard"
                    />
                    {errors.caption && touched.caption && (
                      <Typography
                        sx={{ fontSize: "0.69rem" }}
                        variant="small"
                        color="error"
                      >
                        {errors.caption}
                      </Typography>
                    )}
                  </Box>

                  {/* Image Section*/}
                  <Box {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />

                    <Button
                      variant="raised"
                      component="span"
                      onClick={openFileDialog}
                      sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        width: "100%",
                        margin: "1rem 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <AddAPhotoIcon /> Add Image
                    </Button>

                    {errors.images && (
                      <Typography sx={{ fontSize: "0.69rem" }} color="error">
                        {errors.images}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: palette.primary.main,
                      borderRadius: "3rem",
                      width: "100%",
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        sx={{ color: palette.neutral.dark }}
                        size={16}
                      />
                    ) : (
                      "save changes"
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPostModal;
