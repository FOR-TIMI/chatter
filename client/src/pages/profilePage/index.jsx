import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";


import Navbar from "../../components/navbar";
import FollowingListWidget from '../widgets/FollowingListWidget';
import UserWidget from "../widgets/UserWidget";

import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const ProfilePage = () => {
  const [user, setUser ] = useState(null);



  const navigate = useNavigate()

  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username:signedInUsername} = useSelector((state) => state.user)

  const { username=signedInUsername } = useParams(); 
  


  //To check if the signedInuser's name matches the one from the params
  const isSignedInUserprofile = username === signedInUsername


  const getUser = async() => {
    const response = await fetch(`http://localhost:3001/u/${username}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const userData = await response.json();

    setUser(userData);
  }

  useEffect(() => {
    getUser();
  },[]);


  if(!user) return navigate('/')




  return (
      <Box>
        <Navbar/>

        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget username={user?.username} profilePhotoUrl={user?.profilePhotoUrl}/>
            <Box m="2rem 0"/>
            <FollowingListWidget username={user?.username}/>
          </Box>

          <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {
              isSignedInUserprofile && (
                <>
                <MyPostWidget profilePhotoUrl={user?.profilePhotoUrl}/>
                <Box m="2rem 0"/>
                </>
              )
            }
            <PostsWidget isProfile={true} username={user?.username} />
          </Box>
        </Box>
      </Box>
  )
}

export default ProfilePage