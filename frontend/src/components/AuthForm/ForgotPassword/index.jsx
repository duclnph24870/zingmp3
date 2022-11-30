import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from '../SignUp/SignUp.module.scss';

const cx = classnames.bind(styles);

function ForgotPass ({
    className,
    setShowAuth
}) {

    return (  
        <div className={cx('wrapper',{
            [className]: className,
        })}>
            <div className={cx('header')}>
                Quên mật khẩu
            </div>
            <form className={cx('form')} action="">
                <div className={cx('inputBlock')}>
                    <input 
                        type={'email'} 
                        placeholder="Email"
                    />
                </div>
                <div className={cx('footer')}>
                    <span 
                        className={cx('nextSignUp',{
                            'footerItem': true
                        })}
                        onClick={() => setShowAuth('signIn')}
                    >Đăng nhập</span>
                    <span 
                        className={cx('nextSignUp',{
                            'footerItem': true
                        })}
                        onClick={() => setShowAuth('signUp')}
                    >Đăng ký</span>
                </div>
                <button type='submit' className={cx('submitBtn')}>Xác nhận</button>
            </form>
        </div>
    );
}

ForgotPass.propTypes = {
    className: PropTypes.string,
    setShowAuth: PropTypes.func
}

export default ForgotPass;