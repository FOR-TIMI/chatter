import { Box, Skeleton } from "@mui/material";

const UserAvatar = ({ image, size = "60px", isLoading}) => {

    if(isLoading){
        return (
            <Box width={size} height={size}>
            <Skeleton variant="circle" width={size} height={size} style={{ borderRadius: "50%" }} />
            </Box>
        )
    }
    
    return (
        <Box width={size} height={size}>
            <img
            style={{ objectFit: "cover", borderRadius: "50%"}}
            width={size}
            height={size}
            src={image}
            />

        </Box>
    )
}

export default UserAvatar