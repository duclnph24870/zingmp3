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
    edit = '',
    id,
}) {
    const [name,setName] = useState(edit);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let playlist = null;

            if (edit.length > 0) {
                playlist = await request.post('/playlist/edit/'+ id,{
                    name: name,
                });
            }else {
                playlist = await request.post('/playlist/create',{
                    name: name,
                });
            }

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

            <button disabled={name.length === 0 ? true : false} type='submit'>{edit.length > 0 ? 'Hoàn thành' : 'Tạo mới'}</button>
        </form>
    );
}

CreatePlaylist.propTypes = {
    className: PropTypes.string,
    edit: PropTypes.string,
    id: PropTypes.string,
}

export default CreatePlaylist;