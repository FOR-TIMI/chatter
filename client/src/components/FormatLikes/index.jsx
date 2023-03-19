import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

function FormatLike({ users, isNonMobileScreens, otherLikes }) {
  const [username, setUsername] = useState(users[0]);
  const { palette } = useTheme();

  const handleClick = (username) => {
    setUsername(username);
  };

  return (
    <Box component="span" display="inline">
      {users.length > 1 ? (
        isNonMobileScreens ? (
          users.slice(0, 2).map((user, index) => (
            <Link
              key={uuidv4()}
              to={`/profile/${user}`}
              onClick={() => handleClick(user)}
              style={{ color: palette.neutral.dark }}
            >
              {user}
              {index !== 1 ? ", " : " "}
            </Link>
          ))
        ) : (
          <Link
            to={`/profile/${username}`}
            onClick={() => handleClick(username)}
            style={{ color: palette.neutral.dark }}
          >
            {username + " "}
          </Link>
        )
      ) : users.length === 1 ? (
        <Link
          to={`/profile/${username}`}
          onClick={() => handleClick(username)}
          style={{ color: palette.neutral.dark }}
        >
          {username}
        </Link>
      ) : (
        <></>
      )}
      {users.length + otherLikes > 2 ? (
        <Typography color="textSecondary" display="inline">
          and {otherLikes} {otherLikes > 1 ? "others" : "other"} like this
        </Typography>
      ) : users.length + otherLikes === 0 ? (
        " likes this"
      ) : (
        <Typography color="textSecondary" display="inline">
          like this
        </Typography>
      )}
    </Box>
  );
}

export default FormatLike;
