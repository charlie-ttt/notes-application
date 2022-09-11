import * as React from "react";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import MUICard from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface Props {
  text: string;
}

export default function Card({ text }: Props) {
  return (
    <Box sx={{ margin: 2 }}>
      <MUICard sx={{ width: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }}>{text}</Typography>
        </CardContent>
      </MUICard>
    </Box>
  );
}
