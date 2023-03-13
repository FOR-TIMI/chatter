import { Box, Typography, useTheme } from "@mui/material";
import { formatTime } from "../../utils/formatDate";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";


  const Conversation = ({ profilePhotoUrl, username, lastMessage, createdAt }) => {
  const { palette } = useTheme();
  const { medium } = palette.neutral;

  return (
    <Box padding="0.1rem 0.5rem" sx={{
        cursor : 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover' : {
           backgroundColor : palette.neutral.main
        }
    }}>
      <FlexBetween margin="0.75rem">
        <UserAvatar image={profilePhotoUrl} size="50px" />
        <Box flexGrow={3.5} margin="0 0.5rem">
        <Typography variant="h5" fontWeight="500">
            {username.length > 28
              ? `${username.substring(0, 28)}...`
              : username}
          </Typography>

          <Box sx={{ display : 'flex', gap : 1}}>

          <Typography color={medium} fontSize="0.75rem">
          {lastMessage.length > 28
              ? `${lastMessage.substring(0, 28)}... ` 
              : `${lastMessage}`}
          </Typography>
          
          <Typography fontSize="0.75rem">
             {`.${formatTime(createdAt)}`}
          </Typography>

          </Box>
        </Box>
      </FlexBetween>
    </Box>
  );
};





export default Conversation;
