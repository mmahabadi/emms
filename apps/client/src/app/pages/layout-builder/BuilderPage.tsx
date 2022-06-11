/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {getLayout, ILayout, KTSVG, LayoutSetup, useLayout} from '@emms/ui-kit'

const BuilderPage: React.FC = () => {
  const {setLayout} = useLayout()
  const [tab, setTab] = useState('Header')
  const [config, setConfig] = useState<ILayout>(getLayout())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)

  const updateData = (fieldsToUpdate: Partial<ILayout>) => {
    const updatedData = {...config, ...fieldsToUpdate}
    setConfig(updatedData)
  }

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
    } catch (error) {
      setConfig(getLayout())
    }
    setTimeout(() => {
      setLayout(config)
      setConfigLoading(false)
    }, 1000)
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayout())
      setResetLoading(false)
    }, 1000)
  }

  return (
    <>
      <div className='card mb-10'>
        <div className='card-body d-flex align-items-center py-8'>
          {/* begin::Icon */}
          <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
            <KTSVG
              path='/media/icons/duotune/abstract/abs051.svg'
              className='svg-icon-primary position-absolute opacity-15'
              svgClassName='h-80px w-80px'
            />
            <KTSVG
              path='/media/icons/duotune/coding/cod009.svg'
              className='svg-icon-3x svg-icon-primary position-absolute'
            />
          </div>
          {/* end::Icon */}

          {/* begin::Description */}
          <div className='ms-6'>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              The layout builder is to assist your set and configure your preferred project layout
              specifications and preview it in real-time.
            </p>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              Also, you can configurate the Layout in the code (<code>src/_metronic/layout/core/DefaultLayoutConfig.ts</code> file). Don't forget clear your local storage when you are changing DefaultLayoutConfig.
            </p>
          </div>
          {/* end::Description */}
        </div>
      </div>
      <div className='card card-custom'>
        <div className='card-header card-header-stretch overflow-auto'>
          <ul
            className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap'
            role='tablist'
          >
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer`, {active: tab === 'Header'})}
                onClick={() => setTab('Header')}
                role='tab'
              >
                Header
              </a>
            </li>
            <li className='nav-item'>
              <a
                className={clsx(`nav-link cursor-pointer`, {active: tab === 'Toolbar'})}
                onClick={() => setTab('Toolbar')}
                role='tab'
              >
                Toolbar
              </a>
            </li>
          </ul>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className='card-body'>
          <div className='tab-content pt-3'>
            <div className={clsx('tab-pane', {active: tab === 'Header'})}>
              q
            </div>

            <div className={clsx('tab-pane', {active: tab === 'Toolbar'})}>
              2
            </div>

          </div>
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

export {BuilderPage}
