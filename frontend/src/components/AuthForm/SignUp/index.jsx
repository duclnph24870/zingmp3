import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { countryService } from '../../../service';
import { toast } from 'react-toastify';
import request from '../../../utils/axios';

const cx = classnames.bind(styles);

function SignUp ({
    className,
    setShowAuth
}) {
    const [isShowPass,setIsShowPass] = useState(false); 
    const [country,setCountry] = useState([]);
    const formEl = useRef();
    const { register, handleSubmit,formState: {errors} } = useForm();
    useEffect(() => {
        countryService.getCountry()
            .then(res => {
                setCountry(res.country);
            })
            .catch(err => {
                toast.error('Lỗi server');
            })
    },[]);
    
    const onSubmit = data => {
        request.post('user/signUp',{
            ... data
        })
            .then(res => {
                formEl.current.reset();
                toast.success(res.data.message);
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    };
    return (  
        <div className={cx('wrapper',{
            [className]: className,
        })}>
            <div className={cx('header')}>
                Đăng Ký Tài Khoản
            </div>
            <form ref={formEl} onSubmit={handleSubmit(onSubmit)} className={cx('form')} action="">
                <div className={cx('inputBlock')}>
                    <input 
                        {...register('email',{required:true, minLength: 5, maxLength: 100})}
                        type={'email'} 
                        placeholder="Email"
                    />
                </div>
                {errors.email && <p className={cx('errMessage')}>Số ký tự lớn hơn 5 và nhỏ hơn 100</p>}
                <div className={cx('inputBlock')}>
                    <input 
                        {...register('userName',{required:true, minLength: 5, maxLength: 100})}
                        type={'text'} 
                        placeholder="UserName"
                    />
                </div>
                {errors.userName && <p className={cx('errMessage')}>Số ký tự lớn hơn 5 và nhỏ hơn 100</p>}
                <div className={cx('inputBlock',{'radio': true})}>
                    <label>Giới tính: </label>
                    <input 
                        {...register('gender')}
                        type={'radio'} 
                        value="0"
                        checked
                        name='gender'
                    />Nam 
                    <br/>
                    <input 
                        {...register('gender')}
                        type={'radio'} 
                        style={{marginLeft: 20}} 
                        value="1"
                        name='gender'
                    />Nữ 
                </div>
                <div className={cx('inputBlock',{'select': true})}>
                    <label>Quốc gia:</label>
                    <select {...register('country',{required: true})}>
                        <option value="">--- Chọn quốc gia ---</option>
                        {country && country.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                {errors.country && <p className={cx('errMessage')}>Trường này là trường bắt buộc</p>}

                <div className={cx('inputBlock')}>
                    <input 
                        {...register('password',{required:true, minLength: 5, maxLength: 100})}
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
                        onClick={() => setShowAuth('signIn')}
                    >Bạn đã có tài khoản?</span>
                    <span 
                        className={cx('forgotPass',{
                            'footerItem': true
                        })}
                        onClick={() => setShowAuth('forgotPass')}
                    >Quên mật khẩu?</span>
                </div>
                <button type='submit' className={cx('submitBtn')}>Đăng Ký</button>
            </form>
        </div>
    );
}

SignUp.propTypes = {
    className: PropTypes.string,
    setShowAuth: PropTypes.func
}

export default SignUp;