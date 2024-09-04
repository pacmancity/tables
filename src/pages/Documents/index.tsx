import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {getDocumentList} from "../../store/slices/documents.ts";
import {DocumentsTable} from "../../components/DocumentsTable";
import cn from "classnames";
import style from "./index.module.scss";

export const Documents = () => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.documents);

  useEffect(() => {
    if (status === 'idle') dispatch(getDocumentList());
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div className='container'>Loading...</div>
  }
  if (status === 'error') {
    return <div className='container'>Error...</div>
  }

  return (
    <div className={cn('container', style.container)}>
      <h1 className={style.title}>Документы</h1>
      <DocumentsTable/>
    </div>
  )
}
