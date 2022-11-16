import { IntlProvider } from 'react-intl';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/vi';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en';
import '@formatjs/intl-relativetimeformat/locale-data/vi';

import LanguageUtils from "../utils/LanguageUtils";
import { useSelector } from 'react-redux';

const messages = LanguageUtils.getFlattenedMessages();

function IntlProviderWrapper ({
    children,
}) {
    const language = useSelector(state => state.appReducer.language);
    return (  
        <IntlProvider
            locale={language}
            messages={messages[language]}
            defaultLocale="vi">
            {children}
        </IntlProvider>
    );
}

export default IntlProviderWrapper;