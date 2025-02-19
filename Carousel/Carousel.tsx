import { IconButton, SxProps, Theme } from "@mui/material";
import { Box } from "@mui/system";
import { cloneElement } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CarouselProps {
  /**Styles for the container */
  containerStyle?: SxProps<Theme>;
  /**Styles for the image */
  itemStyle?: SxProps<Theme>;
  /**Styles for the Selected Image */
  selectedItemStyle?: SxProps<Theme>;
  /** List of all components */
  items: any[];
  /**Function Handler to handle the change of the selected Item */
  onChange: (index: number) => void;
  /**selected Index */
  selectedItem: number;
  /**Navigation color */
  navigationColor?: string;
  /**Navigation Background Color */
  navigationBackgrounColor?: string;
  /**Navigation size */
  navigationSize?: "large" | "small" | "medium";
  /**Item Direction Row or Column */
  itemDirection?: "row" | "column";
  /**Item alignment Row or column */
  itemAlignment?: "center" | "start" | "end";
  /**Gap between items */
  itemGap?: number;
  /**Style for the items on hover */
  hoverStyle?: SxProps<Theme>;
}

const Carousel = ({
  containerStyle,
  items,
  itemStyle,
  selectedItemStyle,
  onChange,
  selectedItem,
  navigationSize,
  navigationColor,
  navigationBackgrounColor,
  itemGap,
  itemAlignment,
  itemDirection,
  hoverStyle,
}: CarouselProps) => {
  const handlePrevious = () => {
    if (items.indexOf(items[selectedItem]) > 0) {
      onChange(selectedItem - 1);
    } else {
      onChange(items.length - 1);
    }
  };

  const handleNext = () => {
    if (items.indexOf(items[selectedItem]) < items.length - 1) {
      onChange(selectedItem + 1);
    } else if (items.indexOf(items[selectedItem]) === items.length - 1) {
      onChange(0);
    }
  };
  return (
    <Box
      component="div"
      sx={[
        { boxSizing: "border-box" },
        ...(Array.isArray(containerStyle) ? containerStyle : [containerStyle]),
      ]}
    >
      <IconButton
        sx={(theme) => ({
          color: navigationColor,
          backgroundColor: navigationBackgrounColor,
        })}
        onClick={handlePrevious}
        size={navigationSize}
        focusRipple
        centerRipple
      >
        <FaAngleLeft />
      </IconButton>
      <Box
        component="div"
        sx={[
          {
            width: "100%",
            height: '100%',
            display: "flex",
            flexDirection: itemDirection,
            gap: itemGap,
            justifyContent: itemAlignment
          },
        ]}
      >
        {items.map((item, index) => (
          <Box
            component="div"
            key={index}
            sx={[
              {
                height: "100%",
                cursor: "pointer",
                "& img": {
                  width: "100%",
                  height: "100%",
                  borderRadius: 'inherit',
                },
              },
              ...(index === selectedItem
                ? Array.isArray(selectedItemStyle)
                  ? selectedItemStyle
                  : [selectedItemStyle]
                : []),
              ...(Array.isArray(itemStyle) ? itemStyle : [itemStyle]),
              {
                "&:hover": hoverStyle
              },
            ]}
            onClick={() => onChange(index)}
          >
            {cloneElement(item)}
          </Box>
        ))}
      </Box>
      <IconButton
        sx={(theme) => ({
          color: navigationColor,
          backgroundColor: navigationBackgrounColor,
        })}
        onClick={handleNext}
        size={navigationSize}
        focusRipple
        centerRipple
      >
        <FaAngleRight />
      </IconButton>
    </Box>
  );
};

export default Carousel;