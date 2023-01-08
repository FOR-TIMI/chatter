
import WidgetWrapper from "../CustomStyledComponents/WidgetWrapper";
import FlexBetween from "../CustomStyledComponents/FlexBetween";
import UserAvatar from "../CustomStyledComponents/UserAvatar";
import { Skeleton,Box } from "@mui/material";

const SinglePostSkeleton = () => {
  return (
    <WidgetWrapper mb="2rem">

    {/* Following skeleton  */}
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserAvatar isLoading={true} size="55px" />

                <Box>
                    <Skeleton width="150px" height={25} style={{ marginBottom: "0.25rem" }} />
                    <Skeleton width="75px" height={20} />
                </Box>
            </FlexBetween>
            
            <FlexBetween>
                <Skeleton variant="circle" width={30} height={30} style={{ padding: "0.6rem", borderRadius: "50%" }} />
            </FlexBetween>     
    </FlexBetween>

    <Skeleton width="100%" height={20} style={{ marginTop: "1rem" }} />
    <Skeleton width="50%" height={20} />

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Skeleton variant="rect" width="100%" height="25rem" style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }} />
    </div>

    <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
                <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
            </FlexBetween>

            <FlexBetween gap="0.3rem">
                <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
            </FlexBetween>
        </FlexBetween>

        <Skeleton variant="circle" width={24} height={24} style={{  borderRadius: "50%" }} />
    </FlexBetween>
           
   </WidgetWrapper>
  )
}

export default SinglePostSkeleton