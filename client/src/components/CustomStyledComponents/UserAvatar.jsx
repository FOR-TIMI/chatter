import { Box } from "@mui/material";

const UserAvatar = ({ image, size = "60px" }) => {
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