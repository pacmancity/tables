import {useLayoutEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {useAppDispatch} from "./store";
import {setAuthenticated} from "./store/slices/authorization.ts";
import {Layout} from "./components/Layout";
import {Authorization} from "./pages/Authorization";
import {NotFound} from "./pages/NotFound";
import {Documents} from "./pages/Documents";

export const App = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');
    if (token) dispatch(setAuthenticated({token, username}));
  }, [dispatch])

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Authorization/>}/>
        <Route index path='/documents/' element={<Documents/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}
