import { Box, Typography, useTheme } from "@mui/material";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

const Message = ({ isLast = false, isAuthor = true, isLoading = true }) => {
  const { palette } = useTheme();
  const { light } = palette.neutral;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={isAuthor ? 'flex-end' : 'flex-start'}
      margin="8px 0"
    >
      <Box display="flex" justifyContent={isAuthor ? 'flex-end' : 'flex-start'} alignItems="flex-end" gap={1}>

        { !isAuthor && (
            <UserAvatar
            image="https://res.cloudinary.com/diskudcr3/image/upload/c_thumb,w_200,g_face/v1672524602/chatter/gvvxsfb3v5l76csavwzk.png"
            size="32px"
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
          maxWidth="40%"
        >
          Hello this is a message
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ipsum neque modi! Saepe nemo architecto ullam nesciunt, blanditiis fugit alias
        </Typography>

        {isAuthor && (
          <Typography fontWeight={700} color={light} fontSize={"40px"} visibility={isLoading ? 'visible' : 'hidden'}>{'.'}</Typography>
        )}
      </Box>

      {isLast && (
        <Typography sx={{ margin : !isAuthor ? '0.5rem 0 0 2.5rem' : null}} variant="p" fontWeight="500" fontSize="0.75rem">
          1 hour ago
        </Typography>
      )}
    </Box>
  );
};

export default Message;
