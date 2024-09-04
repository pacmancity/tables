import {Dayjs} from "dayjs";

export type TDocumentFormData = {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export type TDocument = TDocumentFormData & { id: string };

export type TFormData = {
  id: string;
  companySigDate: Dayjs;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: Dayjs;
  employeeSignatureName: string;
}
