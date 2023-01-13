import PropTypes from 'prop-types';
import styles from './CreatePlaylist.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import request from '../../utils/axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { changeModal } from '../../store/actions/appActions';

const cx = classNames.bind(styles);

function CreatePlaylist({
    className,
}) {
    const [name,setName] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const playlist = await request.post('/playlist/create',{
                name: name,
            });

            toast.success(playlist.message);
            dispatch(changeModal({
                isActive: false,
                Component: null,
            }));
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (  
        <form onSubmit={handleSubmit} className={cx('wrapper',{ [className]: className })}>
            <h1 className={cx('title')}>Tạo mới playlist</h1>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={cx('input')} placeholder="Nhập tên playlist"/>

            <button disabled={name.length === 0 ? true : false} type='submit'>Tạo mới</button>
        </form>
    );
}

CreatePlaylist.propTypes = {
    className: PropTypes.string,
}

export default CreatePlaylist;