import React from "react";
import {TableCell as MuiTableCell, TableCellProps as MuiTableCellProps} from "@mui/material";

type TProps = MuiTableCellProps & { children: React.ReactNode }

export const TableCell: React.FC<TProps> = ({children, sx, ...otherProps}) => (
  <MuiTableCell sx={{padding: '16px 10px', ...sx}} {...otherProps}>
    {children}
  </MuiTableCell>
);
