import WidgetWrapper from "../CustomStyledComponents/WidgetWrapper";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";

import { Box, Skeleton, Divider } from "@mui/material";

const UserWidgetSkeleton = () => {
  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween>
          <UserAvatar isLoading={true} />
          <Box marginLeft="1rem">
            <Skeleton variant="h4" width="11rem" />
            <FlexBetween paddingTop="0.4rem" width="11rem">
              <FlexBetween>
                <Skeleton width="5rem" />
              </FlexBetween>
              <FlexBetween>
                <Skeleton width="5rem" />
              </FlexBetween>
            </FlexBetween>
          </Box>
        </FlexBetween>
        <Skeleton width="2rem" height="3rem" sx={{ borderRadius: "50%" }} />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.1rem">
          <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%" }} />
          <Skeleton width="10rem" />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%" }} />
          <Skeleton width="10rem" />
        </Box>
      </Box>

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Skeleton width="10rem" />
          <Skeleton width="4rem" />
        </FlexBetween>

        <FlexBetween>
          <Skeleton width="10rem" />
          <Skeleton width="3rem" />
        </FlexBetween>
      </Box>

      <Box p="1rem 0">
        <Skeleton width="10rem" />
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Skeleton
              width="2rem"
              height="3.2rem"
              sx={{ borderRadius: "50%" }}
            />
            <Box>
              <Skeleton width="10rem" />
              <Skeleton width="6rem" />
            </Box>
          </FlexBetween>
          <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%" }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <Skeleton
              width="2rem"
              height="3.2rem"
              sx={{ borderRadius: "50%" }}
            />
            <Box>
              <Skeleton width="10rem" />
              <Skeleton width="4rem" />
            </Box>
          </FlexBetween>
          <Skeleton width="2rem" height="3.2rem" sx={{ borderRadius: "50%" }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgetSkeleton;
