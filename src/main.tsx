import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {App} from './App.tsx';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';
import dayjs from "dayjs";
import './style/main.scss';

dayjs.locale('ru')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <App/>
        </LocalizationProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
