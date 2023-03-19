import WidgetWrapper from "../CustomStyledComponents/WidgetWrapper";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

import { Box, Skeleton } from "@mui/material";

const FollowingListSkeleton = ({ length = 3 }) => {
  return (
    <WidgetWrapper>
      <Skeleton width="60%" height={25} style={{ marginBottom: "1.5rem" }} />
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.from(new Array(length)).map((p, index) => (
          <FlexBetween key={index}>
            <FlexBetween gap="1rem">
              <UserAvatar isLoading={true} size="55px" />

              <Box>
                <Skeleton
                  width="150px"
                  height={25}
                  style={{ marginBottom: "0.25rem" }}
                />
                <Skeleton width="75px" height={20} />
              </Box>
            </FlexBetween>

            <FlexBetween>
              <Skeleton
                variant="circle"
                width={30}
                height={30}
                style={{ padding: "0.6rem", borderRadius: "50%" }}
              />
            </FlexBetween>
          </FlexBetween>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowingListSkeleton;
