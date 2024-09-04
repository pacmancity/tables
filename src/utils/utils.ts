import {TDocumentFormData} from "../types/document.ts";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const PLACEHOLDER: Record<keyof TDocumentFormData, string> = {
  companySigDate: 'Дата подписи компании',
  companySignatureName: 'Подпись компании',
  documentName: 'Название документа',
  documentStatus: 'Статус документа',
  documentType: 'Тип документа',
  employeeNumber: 'Номер сотрудника',
  employeeSigDate: 'Дата подписи сотрудника',
  employeeSignatureName: 'Подпись сотрудника',
};

export const isEqual = (obj1: Record<string, string>, obj2: Record<string, string>): boolean => {
  const keys1 = Object.keys(obj1);
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
