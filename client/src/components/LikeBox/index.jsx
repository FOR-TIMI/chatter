import {
    Box,
    AvatarGroup,
    Avatar
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { fLikes } from '../../utils/formatNumber';

const LikeBox = ({ likes, likeCount }) => {

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
     { likes.map ( ({username, profilePhotoUrl}) => (
        <Avatar  
        key={uuidv4()} 
        sx={{ width: 23, height: 23 }}
        alt={username}
        src={profilePhotoUrl}
      />
     ))}
  </AvatarGroup>

    <Box component={'span'} sx={{ ml: "0.5rem"}}>
        {fLikes(usernames,likeCount - 2)}
    </Box>
  </Box>
  )
}

export default LikeBox