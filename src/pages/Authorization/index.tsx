import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Button, LinearProgress} from "@mui/material";
import {TAuthorizationData} from "../../types/authorization.ts";
import {authorize, logout, resetAuthorization} from "../../store/slices/authorization.ts";
import {useAppDispatch, useAppSelector} from "../../store";
import EyeIcon from "../../assets/eye.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

export const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const {status, isAuthenticated} = useAppSelector(state => state.authorization);

  useEffect(() => {
    if (status === 'success') {
      dispatch(resetAuthorization());
      navigate("/documents/", {replace: true});
    }
  }, [dispatch, navigate, status]);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TAuthorizationData>({mode: "onTouched"});

  const onSubmit = (formData: TAuthorizationData) => dispatch(authorize(formData));
  const handleLogout = () => dispatch(logout());

  return (
    <form
      className={cn('container', style.form)}
      onSubmit={handleSubmit(onSubmit)}>

      <div className={style.container}>
        <h1 className={style.title}>АВТОРИЗАЦИЯ</h1>

        <div className={cn('inputBlock', style.inputBlock)}>
          <h3>Username</h3>
          <input
            className={cn({'error': errors.username})}
            type='text'
            placeholder='пользователь'
            {...register("username", {
              required: "обязательное поле",
            })}
            disabled={isAuthenticated}
          />
          <span className='errorMessage'>
            {errors?.username?.message}&nbsp;
          </span>
        </div>

        <div className={cn('inputBlock', style.inputBlock)}>
          <h3>Пароль</h3>
          <input
            className={cn({'error': errors.password})}
            type={`${passwordIsVisible ? "text" : "password"}`}
            placeholder={passwordIsVisible ? 'введите пароль' : '************'}
            {...register("password", {
              required: "обязательное поле",
            })}
            disabled={isAuthenticated}
          />
          <button
            className={cn(style.buttonShowPassword, {[style.passwordIsHidden]: !passwordIsVisible})}
            onClick={() => setPasswordIsVisible(!passwordIsVisible)} type='button'>
            <EyeIcon/>
          </button>
          <span className='errorMessage'>
            {errors?.password?.message}&nbsp;
          </span>
        </div>

        {status === 'loading' ? (
          <LinearProgress
            color="primary"
            sx={{
              height: '36.5px',
              width: '200px',
              borderRadius: '4px',
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
            }}
          />
        ) : isAuthenticated ? (
          <Button
            className={style.submitBtn}
            type='button'
            variant="contained"
            color='primary'
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        ) : (
          <Button
            className={style.submitBtn}
            type='submit'
            variant="contained"
            color='primary'
          >
            LOGIN
          </Button>
        )}
      </div>
    </form>
  )
}
