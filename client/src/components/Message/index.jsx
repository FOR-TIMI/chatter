import { Box, Typography, useTheme } from "@mui/material";
import { fToNow } from "../../utils/formatDate";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

const Message = ({ message, isLast, isAuthor, isLoading=false, profilePhoto }) => {
  const { palette } = useTheme();
  const { light } = palette.neutral;


  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={isAuthor ? 'flex-end' : 'flex-start'}
      margin={isAuthor ? null : "4px"}
      width="100%"
    >
      <Box display="flex" justifyContent={isAuthor ? 'flex-end' : 'flex-start'} alignItems="flex-end" gap={0.5}>

        { !isAuthor && (
            <UserAvatar
            image={profilePhoto}
            size="25px"
            />
        ) }


        <Typography
          padding="10px"
          borderRadius="20px"
          sx={{
            border: `2px solid ${light}`,
            backgroundColor: isAuthor ? light : null,
          }}
          variant="p"
          fontWeight="500"
          maxWidth="300px"
        >
          {message.content}
        </Typography>

        {isAuthor && (
          <Typography fontWeight={700} color={light} fontSize={"40px"} visibility={isLoading ? 'visible' : 'hidden'}>{'.'}</Typography>
        )}
      </Box>

      {isLast && (
       <Box paddingRight="1.2rem">
        <Typography sx={{ margin : !isAuthor ? '0.25rem 1rem 0 2.5rem' : null}} variant="p" fontWeight="500" fontSize="0.75rem">
          {fToNow(message.createdAt)}
        </Typography>
       </Box>
      )}
    </Box>
  );
};

export default Message;
