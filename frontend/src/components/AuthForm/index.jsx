import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './AuthForm.module.scss';
import SignIn from './SignIn';
import { useState } from 'react';
import SignUp from './SignUp';
import ForgotPass from './ForgotPassword';

const cx = classnames.bind(styles);

function AuthForm ({
    className,
}) {
    const [showAuth,setShowAuth] = useState('signIn');
    return (  
        <div className={cx('wrapper')}>
            { showAuth === 'signIn' && <SignIn setShowAuth={setShowAuth}/> }
            { showAuth === 'signUp' && <SignUp setShowAuth={setShowAuth}/>}
            { showAuth === 'forgotPass' && <ForgotPass setShowAuth={setShowAuth}/>}
        </div>
    );
}

AuthForm.propTypes = {
    className: PropTypes.string,
}

export default AuthForm;