import React, {useState} from 'react'
import * as Yup from 'yup'
import * as yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {requestPassword} from '../core/_requests'
import {useIntl} from "react-intl";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ForgotInput} from "@emms/models";

const forgotPasswordSchema = Yup.object().shape({
  username: yup.string()
    .required('VALIDATION.REQUIRED')
    .matches(/\d{11}/, 'VALIDATION.INVALID')
    .min(11, 'VALIDATION.INVALID')
    .max(11, 'VALIDATION.INVALID')
});

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const intl = useIntl();

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<ForgotInput>({
    resolver: yupResolver(forgotPasswordSchema)
  });

  const onSubmit: SubmitHandler<ForgotInput> = (values) => {
    setLoading(true);
    setHasErrors(undefined);
    setTimeout(() => {
      requestPassword(values.username)
        .then(({data: {result}}) => {
          setHasErrors(false);
          setLoading(false);
        })
        .catch(() => {
          setHasErrors(true);
          setLoading(false);
        })
    }, 1000)
  }

  return (
    <>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-center mb-10'>
          <h3 className='text-dark mb-3'>
            {intl.formatMessage({id: 'AUTH.FORGOT.TITLE'})}
          </h3>

          <div className='text-gray-400 fw-bold fs-5'>{intl.formatMessage({id: 'AUTH.FORGOT.DESC'})}</div>
        </div>

        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              {intl.formatMessage({id: 'AUTH.FORGOT.FAILED'})}
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>{intl.formatMessage({id: 'AUTH.FORGOT.SUCCESS'})}</div>
          </div>
        )}

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

        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder me-4'
            >
              {intl.formatMessage({id: 'AUTH.GENERAL.BACK_BUTTON'})}
            </button>
          </Link>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder'
          >
            <span className='indicator-label'>{intl.formatMessage({id: 'AUTH.FORGOT.SEND_PASSWORD'})}</span>
            {loading && (
              <span className='indicator-progress'>
                {intl.formatMessage({id: 'GENERAL.LOADING'})}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
