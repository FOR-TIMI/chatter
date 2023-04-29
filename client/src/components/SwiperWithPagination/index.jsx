import { useState } from "react";

// import Swiper core and required modules
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, useMediaQuery } from "@mui/material";
import { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

// Import Swiper styles
import "swiper/swiper-bundle.css";

const SwiperWithPagination = ({ images, addDeletedImage }) => {
  const [checkedItems, setCheckedItems] = useState({}); // state for checkboxes

  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const imageHeight = isNonMobileScreens ? "450px" : "300px";

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
                    height: imageHeight,
                    width: "100%",
                    marginTop: "0.75rem",
                    objectFit: "cover",
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
                    zIndex: 22,
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
