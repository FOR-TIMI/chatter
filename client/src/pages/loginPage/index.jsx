import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogin, setPerson } from "../../state";

import ErrorAlert from "../../components/ErrorAlert";
import { SERVER_URL } from "../../service/config";
import { loginSchema, registerSchema } from "../../utils/Schemas";

const initialValuesRegister = {
  username: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const location = useLocation().pathname.slice(1);
  const [pageType, setPageType] = useState(location); //To turn '/register' to 'register'
  const [globalError, setGlobalError] = useState([]);
  const [loading, setLoading] = useState(false);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  let isLogin = pageType === "login";
  let isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const { username, email, location, occupation, password } = values;
    setLoading(true);

    try {
      const res = await fetch(SERVER_URL + "register", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
          location,
          occupation,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(
          setLogin({
            user: data.newUser,
            token: data.token,
          })
        );
        dispatch(setPerson({ person: data.newUser }));
        onSubmitProps.resetForm();
        navigate("/");
      } else {
        onSubmitProps.setFieldError(data.field, data.errorMsg);
        setGlobalError((prevErrors) => [...prevErrors, data.errorMsg]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const login = async (values, onSubmitProps) => {
    setLoading(true);

    try {
      const { email, password } = values;

      const loggedInResponse = await fetch(SERVER_URL + "login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (loggedInResponse.ok) {
        const loggedIn = await loggedInResponse.json();

        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        dispatch(setPerson({ person: loggedIn.user }));

        navigate("/");
      } else {
        setGlobalError((prevErrors) => [...prevErrors, "Incorret Credentials"]);
      }

      onSubmitProps.resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await register(values, onSubmitProps);
    if (isLogin) await login(values, onSubmitProps);
  };

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
        }}
      >
        Chatter
      </Typography>

      {globalError.length ? (
        <ErrorAlert errors={globalError}></ErrorAlert>
      ) : null}

      <Formik
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                  <TextField
                    label="Username"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setGlobalError([]);
                      handleChange(e);
                    }}
                    value={values.username}
                    name="username"
                    error={
                      Boolean(touched.username) && Boolean(errors.username)
                    }
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
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
                onChange={(e) => {
                  setGlobalError([]);
                  handleChange(e);
                }}
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
            <Box padding="0 1.5rem 1.5rem 1.5rem">
              <Button
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  m: "2rem 0",
                  p: "0.8rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {loading ? (
                  <CircularProgress
                    sx={{
                      color: palette.neutral.dark,
                    }}
                    size={22}
                  />
                ) : isLogin ? (
                  "LOGIN"
                ) : (
                  "REGISTER"
                )}
              </Button>
              <Typography
                onClick={() => {
                  setGlobalError([]);
                  setPageType(isLogin ? "register" : "login");
                  navigate(isLogin ? "/register" : "/login");
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
