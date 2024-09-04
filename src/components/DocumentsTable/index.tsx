import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useForm} from "react-hook-form";
import {Button, LinearProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {TDocumentFormData} from "../../types/document.ts";
import {useAppDispatch, useAppSelector} from "../../store";
import {createDocument, resetDocumentCreation} from "../../store/slices/documents.ts";
import {TableCell} from "../TableCell";
import {Document} from "../Document";
import {DocumentForm} from "../DocumentForm";
import style from "./index.module.scss";

export const DocumentsTable = () => {
  const dispatch = useAppDispatch();
  const {data, createStatus} = useAppSelector(state => state.documents);
  const [isCreatingDocument, setCreateDocument] = useState(false);

  useEffect(() => {
    if (createStatus === 'success') {
      setCreateDocument(false);
      dispatch(resetDocumentCreation())
    }
  }, [dispatch, createStatus]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<TDocumentFormData>({mode: "onTouched"});

  const onSubmit = (formData: TDocumentFormData) => {
    const {companySigDate, employeeSigDate, ...restData} = formData;
    const data = {
      ...restData,
      companySigDate: dayjs(companySigDate).toISOString(),
      employeeSigDate: dayjs(employeeSigDate).toISOString(),
    };
    dispatch(createDocument(data))
  }
  const handleCreateClick = () => setCreateDocument(!isCreatingDocument);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{width: '14%'}}>Company Signature Date</TableCell>
                <TableCell sx={{width: '14%'}}>Company Signature Name</TableCell>
                <TableCell sx={{width: '11%'}}>Document Name</TableCell>
                <TableCell sx={{width: '11%'}}>Document Status</TableCell>
                <TableCell sx={{width: '11%'}}>Document Type</TableCell>
                <TableCell sx={{width: '11%'}}>Employee Number</TableCell>
                <TableCell sx={{width: '14%'}}>Employee Signature Date</TableCell>
                <TableCell sx={{width: '14%'}}>Employee Signature Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((document, index) => <Document key={index} document={document}/>)}

              {isCreatingDocument && <DocumentForm register={register} control={control} errors={errors}/>}

            </TableBody>
          </Table>
        </TableContainer>

        <div className={style.buttonsBlock}>
          {isCreatingDocument && createStatus === 'loading' &&
            <LinearProgress
              color="primary"
              sx={{
                height: '36.5px',
                width: '180px',
                borderRadius: '4px',
                boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
              }}
            />}
          {isCreatingDocument && createStatus !== 'loading' &&
            <Button
              type='submit'
              variant="contained"
              color='primary'
            >
              SUBMIT
            </Button>}

          <Button
            type='button'
            variant="contained"
            color='primary'
            onClick={handleCreateClick}
          >
            {isCreatingDocument ? 'CANCEL' : 'CREATE DOCUMENT'}
          </Button>
        </div>
      </form>
    </>
  )
}
