import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const cx = classnames.bind(styles);

function SignIn ({
    className,
    setShowAuth
}) {
    const [isShowPass,setIsShowPass] = useState(false); 
    const { register, handleSubmit,formState: {errors} } = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    return (  
        <div className={cx('wrapper',{
            [className]: className,
        })}>
            <div className={cx('header')}>
                <button className={cx('signIn-button')}><i className="icon ic-user"></i></button>
                Đăng nhập
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} action="">
                <div className={cx('inputBlock')}>
                    <input 
                        {...register('email', { required: 'Đây là trường bắt buộc', minLength: 5, maxLength: 100 })}
                        type={'email'} 
                        placeholder="Email"
                    />
                </div>
                {errors.email && <p className={cx('errMessage')}>Số ký tự lớn hơn 5 và nhỏ hơn 100</p>}
                <div className={cx('inputBlock')}>
                    <input 
                        {...register('password', { required: 'Đây là trường bắt buộc', minLength: 5, maxLength: 50 })}
                        type={ !isShowPass ? 'password' : 'text'} 
                        placeholder="Password"
                    />
                    <span onClick={() => setIsShowPass(curr => !curr)} className={cx('hiddenPass')}>{isShowPass ? 'hidden' : 'show'}</span>
                </div>
                {errors.password && <p className={cx('errMessage')}>Số ký tự lớn hơn 5 và nhỏ hơn 100</p>}
                <div className={cx('footer')}>
                    <span 
                        className={cx('nextSignUp',{
                            'footerItem': true
                        })}
                        onClick={() => setShowAuth('signUp')}
                    >Bạn chưa có tài khoản?</span>
                    <span 
                        className={cx('forgotPass',{
                            'footerItem': true
                        })}
                        onClick={() => setShowAuth('forgotPass')}
                    >Quên mật khẩu?</span>
                </div>
                <button type='submit' className={cx('submitBtn')}>Đăng Nhập</button>
            </form>
        </div>
    );
}

SignIn.propTypes = {
    className: PropTypes.string,
    setShowAuth: PropTypes.func
}

export default SignIn;