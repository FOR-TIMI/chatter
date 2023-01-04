import { Box, useMediaQuery, Skeleton, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";


import Navbar from "../../components/navbar";
import FollowingListWidget from '../widgets/FollowingListWidget';

import WidgetWrapper from '../../components/CustomStyledComponents/WidgetWrapper'
import UserAvatar from '../../components/CustomStyledComponents/UserAvatar'

import UserWidget from "../widgets/UserWidget";

import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";

import FlexBetween from '../../components/CustomStyledComponents/FlexBetween';



const ProfilePage = () => {
  const [user, setUser ] = useState();
  const [isSignedInUserprofile, setIsSignedInUserprofile] = useState(false)



  const navigate = useNavigate()

  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { username:signedInUsername } = useSelector((state) => state.user)
  const { username } = useParams();

  

  const serverUrl = process.env.REACT_APP_SERVER_URL || "https://nameless-basin-36851.herokuapp.com/" || "http://localhost:3001/"

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
          {!user ?  <WidgetWrapper>
            <FlexBetween gap="0.5rem" pb="1.1rem">
                <FlexBetween>
                    <UserAvatar isLoading={true} />
                    <Box marginLeft="1rem">
                    <Skeleton variant='h4' width="11rem" />
                    <FlexBetween paddingTop="0.4rem" width="11rem">
                        <FlexBetween>
                             <Skeleton width="5rem" />
                        </FlexBetween>
                        <FlexBetween>
                     
                        <Skeleton width="5rem" />
                        </FlexBetween>
                    </FlexBetween>
                    </Box>
                </FlexBetween>
                <Skeleton width="2rem" height="3rem" sx={{ borderRadius: "50%"}}/>
                </FlexBetween>

                <Divider />

                <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.1rem">
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}}/>
                    <Skeleton width="10rem" />
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}} />
                    <Skeleton width="10rem" />
                </Box>
                </Box>

                <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Skeleton width="10rem" />
                    <Skeleton width="4rem" />
                </FlexBetween>

                <FlexBetween>
                    <Skeleton width="10rem" />
                    <Skeleton width="3rem" />
                </FlexBetween>
                </Box>

                <Box p="1rem 0">
                <Skeleton width="10rem" marginBottom="0.7rem" />
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}}/>
                    <Box>
                        <Skeleton width="10rem" />
                        <Skeleton width="6rem" />
                    </Box>
                    </FlexBetween>
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}}/>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}}/>
                    <Box>
                        <Skeleton width="10rem" />
                        <Skeleton width="4rem" />
                    </Box>
                    </FlexBetween>
                    <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%"}}/>
                </FlexBetween>
                </Box>
            </WidgetWrapper> : <UserWidget username={user.username} profilePhotoUrl={user.profilePhotoUrl}/>}
          <Box m="2rem 0"/>
          {!user ? ( <WidgetWrapper>
                <Skeleton width="60%" height={25} style={{ marginBottom: "1.5rem" }} />
                <Box display="flex" flexDirection="column" gap="1.5rem">
                    {Array.from(new Array(3)).map((p,index) => (
                        <FlexBetween key={index}>
                            <FlexBetween gap="1rem">
                                <UserAvatar isLoading={true} size="55px" />
        
                                <Box>
                                    <Skeleton width="150px" height={25} style={{ marginBottom: "0.25rem" }} />
                                    <Skeleton width="75px" height={20} />
                                </Box>
                            </FlexBetween>
                        
                            <FlexBetween>
                                <Skeleton variant="circle" width={30} height={30} style={{ padding: "0.6rem", borderRadius: "50%" }} />
                            </FlexBetween>     
                     </FlexBetween>
                    ))}
                </Box>
            </WidgetWrapper>) : <FollowingListWidget username={user.username}/>}
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
          {!user ? Array.from(new Array(3)).map((el,index) => (
              <WidgetWrapper marginBottom="2rem" key={index}>
        
              {/* Following skeleton  */}
                  <FlexBetween>
                      <FlexBetween gap="1rem">
                          <UserAvatar isLoading={true} size="55px" />
        
                          <Box>
                              <Skeleton width="150px" height={25} style={{ marginBottom: "0.25rem" }} />
                              <Skeleton width="75px" height={20} />
                          </Box>
                      </FlexBetween>
                      
                      <FlexBetween>
                          <Skeleton variant="circle" width={30} height={30} style={{ padding: "0.6rem", borderRadius: "50%" }} />
                      </FlexBetween>     
              </FlexBetween>
        
              <Skeleton width="100%" height={20} style={{ marginTop: "1rem" }} />
              <Skeleton width="50%" height={20} />
        
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Skeleton variant="rect" width="100%" height="25rem" style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} />
              </div>
        
              <FlexBetween mt="0.25rem">
                  <FlexBetween gap="1rem">
                      <FlexBetween gap="0.3rem">
                          <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
                      </FlexBetween>
        
                      <FlexBetween gap="0.3rem">
                          <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
                      </FlexBetween>
                  </FlexBetween>
        
                  <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
              </FlexBetween>
                     
             </WidgetWrapper>
            )  
          ) : <PostsWidget isProfile={true} username={user.username} />               
        }
        </Box>
      </Box>
    </Box>
)





}

export default ProfilePage