import React from "react";
import {FieldErrors, UseFormRegister} from 'react-hook-form';
import {TDocumentFormData} from "../../types/document.ts";
import {TableRow} from "@mui/material";
import {FormCell} from "../FormCell";
import {DatePicker} from "../DatePicker";
import cn from "classnames";

type TProps = {
  register: UseFormRegister<TDocumentFormData>;
  control: any;
  errors: FieldErrors<TDocumentFormData>;
}

export const DocumentForm: React.FC<TProps> = ({register, control, errors}) => (
  <TableRow>
    <FormCell>
      <DatePicker
        name="companySigDate"
        control={control}
        rules={{required: "обязательное поле"}}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.companySignatureName})}
        type='text'
        placeholder='Подпись компании'
        {...register("companySignatureName", {required: "обязательное поле"})}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.documentName})}
        type='text'
        placeholder='Название документа'
        {...register("documentName", {required: "обязательное поле"})}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.documentStatus})}
        type='text'
        placeholder='Статус документа'
        {...register("documentStatus", {required: "обязательное поле"})}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.documentType})}
        type='text'
        placeholder='Тип документа'
        {...register("documentType", {required: "обязательное поле"})}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.employeeNumber})}
        type='text'
        placeholder='Номер сотрудника'
        {...register("employeeNumber", {required: "обязательное поле"})}
      />
    </FormCell>
    <FormCell>
      <DatePicker
        name="employeeSigDate"
        control={control}
        rules={{required: "обязательное поле"}}
      />
    </FormCell>
    <FormCell>
      <input
        className={cn('formInput', {'error': errors.employeeSignatureName})}
        type='text'
        placeholder='Подпись сотрудника'
        {...register("employeeSignatureName", {required: "обязательное поле"})}
      />
    </FormCell>
  </TableRow>
)
