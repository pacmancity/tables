import React from "react";
import {TableCell as MuiTableCell} from "@mui/material";

export const FormCell: React.FC<{ children: React.ReactNode }> = ({children}) => (
  <MuiTableCell sx={{padding: 0}}>
    {children}
  </MuiTableCell>
)
