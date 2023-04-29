import { useState } from "react";

// import Swiper core and required modules
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const SwiperWithPagination = ({ images, addDeletedImage }) => {
  const [checkedItems, setCheckedItems] = useState({}); // state for checkboxes

  // const myImages = [
  //   {
  //     url: "https://res.cloudinary.com/diskudcr3/image/upload/v1680414987/chatter/bvctpxlv89b2gwwv9ivx.jpg",
  //     filename: "chatter/bvctpxlv89b2gwwv9ivx",
  //     _id: "6429190bcbe107aff306461d",
  //   },
  //   {
  //     url: "https://res.cloudinary.com/diskudcr3/image/upload/v1680414987/chatter/bvctpxlv89b2gwwv9ivx.jpg",
  //     filename: "chatter/bvctpxlv89b2gwwv9ivx465747",
  //     _id: "6429190bcbe107aff306461d780",
  //   },
  // ];

  const handleCheckboxChange = (e) => {
    const id = e.target.name;
    setCheckedItems({ ...checkedItems, [id]: e.target.checked });
    addDeletedImage(id);
  };

  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
      >
        {images.map(({ url, filename, _id }) => (
          <SwiperSlide key={uuidv4()}>
            <Box>
              <Box sx={{ position: "relative", objectFit: "cover" }}>
                <img
                  src={url}
                  alt={filename}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "450px",
                    maxHeight: "500px",
                    marginTop: "0.75rem",
                  }}
                />
                <Checkbox
                  icon={<DeleteIcon />}
                  checkedIcon={<CancelIcon />}
                  name={_id}
                  checked={checkedItems[_id]}
                  onChange={handleCheckboxChange}
                  sx={{
                    position: "absolute",
                    top: 2,
                    left: 5,
                    padding: "1rem",
                    "& .MuiSvgIcon-root": {
                      fontSize: "2rem",
                      color: "white",
                    },
                  }}
                />
              </Box>
            </Box>
          </SwiperSlide>
        ))}

        <Box className="swiper-button-prev"></Box>
        <Box className="swiper-button-next"></Box>
      </Swiper>
    </>
  );
};

export default SwiperWithPagination;
