import { Box, Text } from "@mantine/core";
// import classes from "./RatingStyle.module.css";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

export default function Rating({ rating }) {

 const rate = rating || 0;

  // تقريب لأقرب نصف نجمة
  const roundedRate = Math.round(rate * 2) / 2;
  const fullStars = Math.floor(roundedRate);
  const hasHalfStar = roundedRate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box display={"flex"}>
      <Box
        display="flex"
        style={{ gap: "4px", alignItems: "center" }}
      >
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <IconStarFilled
            key={`full-${index}`}
            color="gold"
            size={18}
          />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <IconStarHalfFilled
            color="gold"
            size={18}
          />
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <IconStar
            key={`empty-${index}`}
            color="gold"
            size={18}
          />
        ))}
      </Box>

      <Text ml={5} fw={500} fz={14}>
        {"{"}
        {rate} 
        {"}"}
      </Text>
    </Box>
  );

}
