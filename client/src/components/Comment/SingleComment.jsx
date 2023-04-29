import { useNavigate } from "react-router-dom";
// utils
import { formatTime } from "../../utils/formatDate";
import { fShortenNumber } from "../../utils/formatNumber";

import {
  Box,
  Checkbox,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useSelector } from "react-redux";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

const SingleComment = ({ comment, onLikeClick }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const {
    _id,
    createdAt,
    username,
    likes = {},
    userProfilePhoto,
    commentBody,
  } = comment;

  const { username: signedInUsername } = useSelector((state) => state.user);

  const isLiked = Boolean(likes[signedInUsername]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const { medium } = palette.neutral;

  const navigate = useNavigate();

  return (
    <FlexBetween
      sx={{
        m: "0.7rem 3% 0 3%",
        width: "100%",
      }}
    >
      <UserAvatar image={userProfilePhoto} size="32px" />

      <Box
        sx={{
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow: 1,
          padding: "0.3rem 1.2rem 0.5rem 1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component={"span"}>
            <Box
              component={"span"}
              fontWeight={600}
              mr="0.25rem"
              color={palette.neutral.dark}
              sx={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/profile${
                    username === signedInUsername ? "" : "/" + username
                  }`
                )
              }
            >
              {username}
            </Box>
            <Box
              component={"span"}
              sx={{
                fontSize: { isNonMobileScreens },
              }}
            >
              {commentBody}
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography mr={2} color={medium} fontSize="0.75rem">
              {formatTime(createdAt)}
            </Typography>
            <Typography mr={2} color={medium} fontSize="0.75rem">
              {fShortenNumber(likeCount) || 0}{" "}
              {likeCount !== 1 ? "likes" : "like"}
            </Typography>
          </Box>
        </Box>

        <Checkbox
          size="24"
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          checked={isLiked}
          onChange={() => onLikeClick(_id)}
        />
      </Box>
    </FlexBetween>
  );
};

export default SingleComment;
