import { useState } from 'react'

import {
    EditOutlined
    ,DeleteOutlined
    ,AttachFileOutlined
    ,GifBoxOutlined
    ,ImageOutlined
    ,MicOutlined
    ,MoreHorizOutlined
} from '@mui/icons-material';

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from '@mui/material';

import FlexBetween from '../../components/CustomStyledComponents/FlexBetween';
import Dropzone from 'react-dropzone'
import UserAvatar from '../../components/CustomStyledComponents/UserAvatar';
import { setPosts } from "../../state" 
import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from '../../components/CustomStyledComponents/WidgetWrapper';


const MyPostWidget = ({ profilePhotoUrl }) => {
    const dispatch = useDispatch()
    const [imageUrls, setImageUrls] = useState([]);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] =useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { username } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);
    
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const { mediumMain, medium} = palette.neutral;

    const handleDrop = (acceptedFiles) => {
        setImageUrls(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));

        setImage(acceptedFiles)
    };


    const handlePost = async (e) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append('caption', post);
        
        const serverUrl = process.env.REACT_APP_SERVER_URL|| "http://localhost:3001/" || "https://nameless-basin-36851.herokuapp.com/" 

   

        imageUrls.forEach((image) => {
          formData.append('postImageUrls', image);
        })

        const response = await fetch( serverUrl + `p`,{
          method: "POST",
          headers: { Authorization: `Bearer ${token}`},
          body:formData
        })

        const posts = await response.json();
        
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("")
    }

  
  return (
    <WidgetWrapper m="0 0 2rem 0">
      <FlexBetween gap="1.5rem">
        <UserAvatar image={profilePhotoUrl}/>
        <InputBase 
          placeholder="What's on your mind?....."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem"
          }}
        />
      </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={true}
              onDrop={handleDrop}
            >
              {({ getRootProps, getInputProps}) => (
                <FlexBetween>

                  <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer"}}}
                  >
                    <input {...getInputProps()}/>
                    {!image ? (
                        <p>Add Images Here</p>
                    ): (
                      <FlexBetween>
                         <FlexBetween>
                            {imageUrls.map(img => (
                                  <img  
                                  width="70rem"
                                  height="70rem" 
                                  style={{
                                    margin: "0 0.25rem",
                                    border: `0.2rem solid ${palette.primary.dark}`
                                  }}
                                  src={img.preview} alt={img.name} key={img.preview} />
                              ))}
                         </FlexBetween>   
                        <EditOutlined/>
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                    >
                      <DeleteOutlined/>   
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}

        <Divider sx={{margin: "1.25rem 0"}} />

         <FlexBetween>
              <FlexBetween gap="0.25rem" onClick={() =>setIsImage(!isImage)}>
                    <ImageOutlined sx={{color: mediumMain }}/>
                    <Typography
                      color={{mediumMain}}
                      sx={{ "&:hover": { cursor: "pointer", color: medium}}}
                    >
                      Image
                    </Typography>
              </FlexBetween>

              { isNonMobileScreens ? (
                <>
                  <FlexBetween gap="0.25rem">
                    <GifBoxOutlined sx={{color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                  </FlexBetween>

                  <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                  </FlexBetween>

                  <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                  </FlexBetween>
                </>
                 ) : (
                <FlexBetween gap="0.25rem">
                  <MoreHorizOutlined sx={{ color: mediumMain}}/>
                </FlexBetween>
              )}

              <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem"
                }}
              >
                Post
              </Button>
         </FlexBetween>

    </WidgetWrapper>
  )
}

export default MyPostWidget