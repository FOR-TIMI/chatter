import { Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import WidgetWrapper from "../../components/CustomStyledComponents/WidgetWrapper";
import InfoIcon from '@mui/icons-material/Info';
import { useState, useEffect } from "react";

const AdWidget = () => {
    const { palette } = useTheme();
    const { dark, main, medium} = palette;

    const ads = [
        {
            url: "https://i.pinimg.com/736x/d6/3d/5f/d63d5f27d6e46a6918a26f36a5f31c0f.jpg",
            name: "Nike",
            text: "From the field to the streets, we've got you covered."
        },
        {
            url: "https://1000logos.net/wp-content/uploads/2019/06/Adidas-Logo-1991.jpg",
            name: "Adidas",
            text: "Elevate your performance with our gear."
        },
        {
            url: "https://i0.wp.com/cultedge.com/wp-content/uploads/2019/02/Champion-logo-001.jpg",
            name: "Champion",
            text: "Where champions shop"
        }
    ]

    const [ad, setAd] = useState(ads[0]);

    useEffect(() => {
        setInterval(()=> {
            const nextAd = ads[Math.floor(Math.random() * ads.length)]
            setAd(nextAd)
        },10000)
    },[ad])

    return (
        <WidgetWrapper>
          <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
              Sponsored
            </Typography>
            <Typography color={medium}>Create Ad</Typography>
          </FlexBetween>
          <img
            width="100%"
            height="auto"
            alt="advert"
            src={ad.url}
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
          />
          <FlexBetween>
            <Typography color={main}>{ad.name}</Typography>
            <Typography color={medium}>{ad.name}.com</Typography>
          </FlexBetween>
          <Typography color={medium} m="0.5rem 0">
             {ad.text}
          </Typography>
        </WidgetWrapper>
    )

}

export default AdWidget