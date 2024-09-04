import React, {useState} from "react";
import {TDocument} from "../../types/document.ts";
import {Button, LinearProgress, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store";
import {deleteDocument} from "../../store/slices/documents.ts";
import {EditableElement} from "../EditableElement";
import {formatDate} from "../../utils/utils.ts";
import DeleteIcon from "../../assets/trash-bin.svg?react";
import style from "./index.module.scss";
import {FormCell} from "../FormCell";

export const Document: React.FC<{ document: TDocument }> = ({document}) => {
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const isDeleting = useAppSelector(state => state.documents.deleteStatus)[document?.id];
  const handleDelete = () => dispatch(deleteDocument(document.id))
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TableRow
      className={style.tableRow}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
    >
      <EditableElement name='companySigDate' type='date' value={formatDate(document.companySigDate)}
                       document={document}/>
      <EditableElement name='companySignatureName' type='string' value={document.companySignatureName}
                       document={document}/>
      <EditableElement name='documentName' type='string' value={document.documentName}
                       document={document}/>
      <EditableElement name='documentStatus' type='string' value={document.documentStatus}
                       document={document}/>
      <EditableElement name='documentType' type='string' value={document.documentType}
                       document={document}/>
      <EditableElement name='employeeNumber' type='string' value={document.employeeNumber}
                       document={document}/>
      <EditableElement name='employeeSigDate' type='date' value={formatDate(document.employeeSigDate)}
                       document={document}/>
      <EditableElement name='employeeSignatureName' type='string' value={document.employeeSignatureName}
                       document={document}/>

      {isFocused && (
        <FormCell>
          <Button
            type='button'
            variant="contained"
            color='primary'
            sx={{minWidth: 'unset', padding: '8px 12px'}}
            onClick={handleDelete}
          >
            <DeleteIcon/>
          </Button>
        </FormCell>
      )}

      {isDeleting &&
        <LinearProgress
          color="primary"
          sx={{position: 'absolute', inset: ' 0 0 0 0', height: '100%'}}
        />}
    </TableRow>
  )
}
