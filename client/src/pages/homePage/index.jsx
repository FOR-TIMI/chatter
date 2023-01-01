import React from 'react'
import Navbar from '../../components/navbar';
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import FollowingListWidget from '../widgets/FollowingListWidget';
import AdWidget from "../widgets/AdWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const data = useSelector((state) => state.user)

  const username = data?.username
  const profilePhotoUrl = data?.profilePhotoUrl
 
  if(!username || !profilePhotoUrl){
     return (
      <Box>
        <Navbar/>
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
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget username={username} profilePhotoUrl={profilePhotoUrl}/>
          </Box>

          <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget profilePhotoUrl={profilePhotoUrl}/>
            <PostsWidget username={username} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <AdWidget/>
              <Box m="2rem 0"/>   
              <FollowingListWidget username={username}/>
            </Box>
          )}
        </Box>
    </Box>
  )
}

export default HomePage