/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  const {NX_REACT_APP_VERSION, REACT_APP_PREVIEW_DOCS_URL} = process.env;
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItemWithSub
        to='/assets'
        title={intl.formatMessage({id: 'MENU.ASSETS'})}
        icon='/media/icons/duotune/general/gen017.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem
          to='/assets/overview'
          title={intl.formatMessage({id: 'MENU.ASSETS.ASSET'})}
          hasBullet={true} />
        <AsideMenuItem
          to='/assets/categories'
          title={intl.formatMessage({id: 'MENU.ASSETS.CATEGORY'})}
          hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/setting'
        title={intl.formatMessage({id: 'MENU.SETTING'})}
        icon='/media/icons/duotune/general/gen017.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem
          to='/setting/overview'
          title={intl.formatMessage({id: 'MENU.SETTING.GOODS'})}
          hasBullet={true} />
      </AsideMenuItemWithSub>

      {/*<AsideMenuItem*/}
      {/*  to='/builder'*/}
      {/*  icon='/media/icons/duotune/general/gen019.svg'*/}
      {/*  title='Layout Builder'*/}
      {/*  fontIcon='bi-layers'*/}
      {/*/>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content pt-8 pb-2'>*/}
      {/*    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/pages'*/}
      {/*  title='Pages'*/}
      {/*  fontIcon='bi-archive'*/}
      {/*  icon='/media/icons/duotune/general/gen022.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />*/}
      {/*    <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/crafted/pages/profile/connections'*/}
      {/*      title='Connections'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*  </AsideMenuItemWithSub>*/}

      {/*  <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>*/}
      {/*    <AsideMenuItem*/}
      {/*      to='/crafted/pages/wizards/horizontal'*/}
      {/*      title='Horizontal'*/}
      {/*      hasBullet={true}*/}
      {/*    />*/}
      {/*    <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />*/}
      {/*  </AsideMenuItemWithSub>*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/accounts'*/}
      {/*  title='Accounts'*/}
      {/*  icon='/media/icons/duotune/communication/com006.svg'*/}
      {/*  fontIcon='bi-person'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/error'*/}
      {/*  title='Errors'*/}
      {/*  fontIcon='bi-sticky'*/}
      {/*  icon='/media/icons/duotune/general/gen040.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/crafted/widgets'*/}
      {/*  title='Widgets'*/}
      {/*  icon='/media/icons/duotune/general/gen025.svg'*/}
      {/*  fontIcon='bi-layers'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content pt-8 pb-2'>*/}
      {/*    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<AsideMenuItemWithSub*/}
      {/*  to='/apps/chat'*/}
      {/*  title='Chat'*/}
      {/*  fontIcon='bi-chat-left'*/}
      {/*  icon='/media/icons/duotune/communication/com012.svg'*/}
      {/*>*/}
      {/*  <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />*/}
      {/*  <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />*/}
      {/*</AsideMenuItemWithSub>*/}
      {/*<AsideMenuItem*/}
      {/*  to='/apps/user-management/users'*/}
      {/*  icon='/media/icons/duotune/general/gen051.svg'*/}
      {/*  title='User management'*/}
      {/*  fontIcon='bi-layers'*/}
      {/*/>*/}
      {/*<div className='menu-item'>*/}
      {/*  <div className='menu-content'>*/}
      {/*    <div className='separator mx-1 my-4'></div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className='menu-item'>*/}
      {/*  <a*/}
      {/*    target='_blank'*/}
      {/*    className='menu-link'*/}
      {/*    href={REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}*/}
      {/*  >*/}
      {/*    <span className='menu-icon'>*/}
      {/*      <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />*/}
      {/*    </span>*/}
      {/*    <span className='menu-title'>Changelog {NX_REACT_APP_VERSION}</span>*/}
      {/*  </a>*/}
      {/*</div>*/}
    </>
  )
}
