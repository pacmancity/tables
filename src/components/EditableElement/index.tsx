import React, {useEffect, useState} from "react";
import {ClickAwayListener, LinearProgress} from "@mui/material";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import {TableCell as MuiTableCell} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store";
import {resetDocumentUpdateStatus, updateDocument} from "../../store/slices/documents.ts";
import {TDocument, TDocumentFormData, TFormData} from "../../types/document.ts";
import {DatePicker} from "../DatePicker";
import {TableCell} from "../TableCell";
import {FormCell} from "../FormCell";
import {isEqual, PLACEHOLDER} from "../../utils/utils.ts";
import cn from "classnames";
import style from "./index.module.scss";

type TProps = {
  name: keyof TDocumentFormData;
  type: string;
  value: string;
  document: TDocument;
}

export const EditableElement: React.FC<TProps> = ({name, type, value, document}) => {
  const dispatch = useAppDispatch();
  const {updateStatus} = useAppSelector(state => state.documents);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const id = document.id
  const isUpdating = updateStatus[id];

  useEffect(() => {
    if (isEditing && updateStatus[id] === 'success') {
      dispatch(resetDocumentUpdateStatus(id))
      setIsEditing(false);
    }
  }, [dispatch, isEditing, isUpdating, id, updateStatus]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    reset,
  } = useForm<TFormData>({mode: "onTouched"});

  const handleSubmitForm = handleSubmit(
    (formData: TFormData) => {
      const {companySigDate, employeeSigDate, ...restData} = formData;
      const data = {
        companySigDate: dayjs(companySigDate).toISOString(),
        employeeSigDate: dayjs(employeeSigDate).toISOString(),
        ...restData
      };
      if (isEqual(document, data)) {
        setIsEditing(false);
        return;
      }
      dispatch(updateDocument(data))
    }
  );

  const handleClick = () => {
    const {companySigDate, employeeSigDate, ...restData} = document;
    reset({
      companySigDate: dayjs(companySigDate),
      employeeSigDate: dayjs(employeeSigDate),
      ...restData
    })
    setIsEditing(true);
  };
  const handleClickAway = async () => {
    await handleSubmitForm();
  };

  return (
    <>
      {isEditing && !isUpdating &&
        <FormCell>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              {type === 'date' ? (
                <DatePicker
                  name={name}
                  control={control}
                  rules={{required: "обязательное поле"}}
                />
              ) : (
                <input
                  className={cn('formInput', {'error': errors[name]})}
                  type='text'
                  placeholder={PLACEHOLDER[name]}
                  {...register(name, {required: "обязательное поле"})}
                />
              )}
            </div>
          </ClickAwayListener>
        </FormCell>
      }

      {isEditing && isUpdating &&
        <MuiTableCell sx={{position: 'relative'}}>
          <LinearProgress
            color="primary"
            sx={{
              position: 'absolute',
              borderRadius: '4px',
              height: '100%',
              left: 0,
              right: 0,
              top: 0,
            }}
          />
        </MuiTableCell>}

      {!isEditing &&
        <TableCell>
          <div className={style.editable} onClick={handleClick}>
            {value}
          </div>
        </TableCell>}
    </>
  )
}
