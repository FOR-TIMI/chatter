import { Box, useMediaQuery, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";


import Navbar from "../../components/navbar";
import FollowingListWidget from '../widgets/FollowingListWidget';
import UserWidget from "../widgets/UserWidget";

import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";




const ProfilePage = () => {
  const [user, setUser ] = useState();
  const [isSignedInUserprofile, setIsSignedInUserprofile] = useState(false)



  const navigate = useNavigate()

  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { username:signedInUsername } = useSelector((state) => state.user)
  const { username } = useParams();

  

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001/"

  //To check if the signedInuser's name matches the one from the params



const getUser = async () => {

    const targetUsername = username || signedInUsername;
 
      const response = await fetch(
        serverUrl + `u/${targetUsername}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.ok){
        const userData = await response.json();
      
        setIsSignedInUserprofile(userData.username === signedInUsername)
        setUser(userData);
      } else{
        navigate('/')
      }
};

useEffect(() => {
  getUser();
}, []);


  if(!user){
    return (
      <Box>
        <Navbar />

        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <Skeleton variant="rect" width={200} height={200} />
            <Box m="2rem 0" />
            <Skeleton variant="rect" width={200} height={50} />
          </Box>

          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {isSignedInUserprofile && (
              <>
                <Skeleton variant="rect" width={200} height={200} />
                <Box m="2rem 0" />
              </>
            )}
            <Skeleton variant="rect" width={400} height={50} />
          </Box>
        </Box>
    </Box>
    )
  }



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
          <UserWidget username={user.username} profilePhotoUrl={user.profilePhotoUrl}/>
          <Box m="2rem 0"/>
          <FollowingListWidget username={user.username}/>
        </Box>

        <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {
            isSignedInUserprofile && (
              <>
              <MyPostWidget profilePhotoUrl={user.profilePhotoUrl}/>
              <Box m="2rem 0"/>
              </>
            )
          }
          <PostsWidget isProfile={true} username={user.username} />
        </Box>
      </Box>
    </Box>
)





}

export default ProfilePage