import {Link, Outlet} from "react-router-dom";
import {useAppSelector} from "../../store";
import style from "./index.module.scss";

export const Layout = () => {
  const {isAuthenticated} = useAppSelector(state => state.authorization);

  return (
    <main>
      {isAuthenticated && <header className='container'>
        <nav className={style.nav}>
          <Link to='/'>Авторизация</Link>
          <Link to='/documents/'>Документы</Link>
        </nav>
      </header>}
      <Outlet/>
    </main>
  )
}
