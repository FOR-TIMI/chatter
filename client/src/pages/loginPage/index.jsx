import { useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Container,
  Avatar,
  IconButton
} from "@mui/material";


import Tooltip from '@mui/material/Tooltip';
import { ConstructionOutlined, PhotoCamera } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";

import { registerSchema, loginSchema } from "../../utils/Schemas";


const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const location = useLocation();
  const [pageType, setPageType] = useState(location.pathname.slice(1)) //To turn '/register' to 'register'
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  let isLogin = pageType === "login";
  let isRegister = pageType === "register";
  
     

  // const register = async (values, onSubmitProps) => {
  //   // this allows us to send form info with image
  //   const formData = new FormData();
  //   for (let value in values) {
  //     formData.append(value, values[value]);
  //   }
  //   formData.append("picturePath", values.picture.name);

  //   const savedUserResponse = await fetch(
  //     "http://localhost:3001/auth/register",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
  //   const savedUser = await savedUserResponse.json();
  //   onSubmitProps.resetForm();

  //   if (savedUser) {
  //     setPageType("login");
  //   }
  // };

  // const login = async (values, onSubmitProps) => {
  //   const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(values),
  //   });
  //   const loggedIn = await loggedInResponse.json();
  //   onSubmitProps.resetForm();
  //   if (loggedIn) {
  //     dispatch(
  //       setLogin({
  //         user: loggedIn.user,
  //         token: loggedIn.token,
  //       })
  //     );
  //     navigate("/");
  //   }
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // if (isLogin) await login(values, onSubmitProps);
    // if (isRegister) await register(values, onSubmitProps);
  console.log("hooray")
    console.log({ values, onSubmitProps})
  };

  const fileInputRef = useRef(null);

  const handleFileSelection = () => {
    fileInputRef.current.click();
  }

  return (
   <Container maxWidth="sm">
    <Typography
      fontWeight="bold"
      textAlign="center"
      paddingTop="1rem"
      fontSize="clamp(1rem, 2rem, 2.25rem)"
      color="primary"
      onClick={() => navigate("/")}
      sx={{
        "&:hover": {
          color: palette.primary.light,
          cursor: "pointer",
        },
      }}>
        Chatter
      </Typography>
     <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >

        
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            padding="1.5rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
              <Box
                  gridColumn="span 4"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  align-items="center"
                >
                   <Avatar src="/default-avatar.jpg" alt="JS" style={{ width: '5rem', height: '5rem', marginLeft: '2rem' }}  />
                    <IconButton onClick={handleFileSelection} style={{ position: 'relative', left: '-1.8rem', top: '1.5rem'}}>
                      <Tooltip title="Add profile photo">
                        <PhotoCamera sx={{ fontSize: '2rem'}}/>
                      </Tooltip>
                    </IconButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      accept=".jpg, .jpeg, .png"
                    />
                  {/* <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input  />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone> */}
                </Box>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box padding="0 1.5rem 1.5rem 1.5rem" >
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "0.8rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                navigate(isLogin ? '/register' : '/login')
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
   </Container>
  );
};

export default Form;