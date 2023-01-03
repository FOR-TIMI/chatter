import { 
  BrowserRouter
  ,Navigate
  ,Routes
  ,Route
} from 'react-router-dom'

import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'
// import NoMatch from './pages/NoMatch'



import { useMemo } from 'react'
import { useSelector } from 'react-redux';


import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./utils/theme";


const App = () => { 
  //Check if a user is loggedIn
  const isLoggedIn = Boolean(useSelector((state) => state.token))


  //To get the current mode from the redux store
  const mode = useSelector((state ) =>  state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <main>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/' element={isLoggedIn ? <HomePage/> : <Navigate to="/login" />}/>

            <Route path='/'>
                <Route path="login" element={!isLoggedIn ? <LoginPage/> : <Navigate to="/" />} />
                <Route path="register" element={!isLoggedIn ? <LoginPage/> : <Navigate to="/" />} />
            </Route>

            <Route path="/profile">
                <Route path=":username" element={isLoggedIn ? <ProfilePage/> : <Navigate to="/login" />} />
                <Route path="" element={isLoggedIn ? <ProfilePage/> : <Navigate to="/login" />} />
            </Route>

            <Route
                path="*"
                element={isLoggedIn ? <HomePage/> : <Navigate to="/login" />}
              />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  )
}

export default App