import {
    Box,
    AvatarGroup,
    Avatar,
    useMediaQuery
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';


import FormatLike from '../FormatLikes';

const LikeBox = ({ likes, likeCount }) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


    const usernames = likes.map(l => l.username)
    return (
    <Box
    sx={{
      display: 'flex',
      justifyContent:'flex-start',
      alignItems: "center",
      mb:"1rem"    
    }}
  >
<AvatarGroup max={4}>
  {likes.slice(0, isNonMobileScreens ? 4 : 3).map(({username, profilePhotoUrl}, i) => (
    <Avatar
      key={uuidv4()}
      sx={{ width: 23, height: 23 }}
      alt={username}
      src={profilePhotoUrl}
    />
  ))}
</AvatarGroup>

    <Box component={'span'} sx={{ ml: "0.5rem"}}>
        <FormatLike isNonMobileScreens={isNonMobileScreens} 
          users={usernames}
          otherLikes={isNonMobileScreens ? likeCount - 2 : likeCount - 1}
        />
    </Box>
  </Box>
  )
}

export default LikeBox