import React, { useState } from 'react';
import { Typography, Box, useTheme} from '@mui/material';
import { Link } from 'react-router-dom';


function FormatLike({ users, isNonMobileScreens, otherLikes }) {
  const [username, setUsername] = useState(users[0]);

  const { palette } = useTheme();

  const handleClick = (username) => {
    setUsername(username);
  };

  return (
    <Box component='span' display="inline">
      {isNonMobileScreens ? (
        users.slice(0, 2).map((user, index) => (
          <Link style={{
            color : palette.neutral.dark
          }} key={index} to={`/profile/${user}`} onClick={() => handleClick(user)}>
            {user}
            {index !== 1 ? ', ' : ' '}
          </Link>
        ))
      ) : (
        <Link style={{
            color : palette.neutral.dark
         }} to={`/profile/${username}`} onClick={() => handleClick(username)}>
          {username + " "}
        </Link>
      )}
     {otherLikes > 0 ? (
            <Typography color="textSecondary" display="inline">
            and {otherLikes} {otherLikes > 1 ? "others" : "other"} like this
          </Typography>
     ) :(
      <Typography color="textSecondary" display="inline">
        likes this
      </Typography>
     ) }
    </Box>
  );
}

export default FormatLike