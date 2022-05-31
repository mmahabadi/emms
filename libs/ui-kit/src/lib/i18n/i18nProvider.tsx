import {FC} from 'react'
import {useLang} from './Layouti18n'
import {IntlProvider} from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import enMessages from './messages/en.json';

const allMessages = {
  en: enMessages
}

const I18nProvider: FC<any> = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
