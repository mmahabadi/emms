/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../helpers'
import {useAuth} from '../core/Auth'
import {useIntl} from "react-intl";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginInputs} from "@emms/models";

const loginSchema = yup.object().shape({
  username: yup.string()
    .required('VALIDATION.REQUIRED')
    .matches(/\d{11}/, 'VALIDATION.INVALID')
    .min(11, 'VALIDATION.INVALID')
    .max(11, 'VALIDATION.INVALID'),
  password: yup.string()
    .required('VALIDATION.REQUIRED')
});


export function Login() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const {saveAuth, setCurrentUser} = useAuth();
  const intl = useIntl();

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    setLoading(true);
    try {
      const {data: auth} = await login(values);
      if (auth) {
        saveAuth(auth);
        const {data: user} = await getUserByToken(auth.api_token);
        setCurrentUser(user)
      } else {
        failedLogin();
      }
    } catch (error) {
      console.error(error)
      failedLogin();
    }
  };

  const failedLogin = () => {
    saveAuth(undefined)
    setHasErrors(true);
    setLoading(false);
  }

  return (
    <form
      className='form w-100'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='text-center mb-10'>
        <h3 className='text-dark mb-3'>{intl.formatMessage({id: 'AUTH.LOGIN.TITLE'})}</h3>
        {/*<div className='text-gray-400 fw-bold fs-4'>*/}
        {/*  New Here?{' '}*/}
        {/*  <Link to='/auth/registration' className='link-primary fw-bolder'>*/}
        {/*    Create an Account*/}
        {/*  </Link>*/}
        {/*</div>*/}
      </div>

      {hasErrors &&
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{intl.formatMessage({id: 'AUTH.LOGIN.INCORRECT_STATUS'})}</div>
        </div>
      }

      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>
          {intl.formatMessage({id: 'AUTH.INPUT.MOBILE'})}
        </label>
        <input
          {...register("username", {required: true})}
          placeholder={intl.formatMessage({id: 'AUTH.PLACEHOLDER.MOBILE'})}
          type="tel"
          className={clsx(
            'form-control form-control-lg form-control-solid text-left',
            {'is-invalid': isSubmitted && errors.username},
            {'is-valid': isSubmitted && !errors.username}
          )}
          autoComplete="off"
        />
        {errors.username && (
          <div className='fv-plugins-message-container'>
            <span role='alert' className="text-danger">{intl.formatMessage({id: errors.username?.message},
              {name: intl.formatMessage({id: 'AUTH.INPUT.MOBILE'})})}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>
              {intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})}
            </label>
          </div>
        </div>
        <input
          type='password'
          placeholder="****"
          autoComplete='off'
          {...register("password")}
          className={clsx(
            'form-control form-control-lg form-control-solid text-left',
            { 'is-invalid': isSubmitted && errors.password },
            { 'is-valid': isSubmitted && !errors.password }
          )}
        />
        {errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' className="text-danger">
                {intl.formatMessage({id: errors.password?.message},
                              {name: intl.formatMessage({id: 'AUTH.INPUT.PASSWORD'})})}
              </span>
            </div>
          </div>
        )}
        <Link
          to='/auth/forgot-password'
          className='link-primary fs-6 fw-bolder pt-2 me-1 d-block text-left'
          tabIndex={10}
        >
          {intl.formatMessage({id: 'AUTH.GENERAL.FORGOT_BUTTON'})}
        </Link>

      </div>

      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
        >
          {!loading && <span className='indicator-label'>{intl.formatMessage({id: 'AUTH.LOGIN.BUTTON'})}</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              {intl.formatMessage({id: 'GENERAL.LOADING'})}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        <div className='text-center text-muted text-uppercase fw-bolder mb-5'>
          {intl.formatMessage({id: 'AUTH.GENERAL.OR'})}
        </div>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          {intl.formatMessage({id: 'AUTH.LOGIN.BUTTON.GOOGLE'})}
        </a>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          {intl.formatMessage({id: 'AUTH.LOGIN.BUTTON.FACEBOOK'})}
        </a>

        <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          {intl.formatMessage({id: 'AUTH.LOGIN.BUTTON.APPLE'})}
        </a>
      </div>
    </form>
  )
}
