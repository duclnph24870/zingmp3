import PropTypes from 'prop-types';
import styles from './CreatePlaylist.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CreatePlaylist({
    className,
}) {
    const [name,setName] = useState('');

    return (  
        <form className={cx('wrapper',{ [className]: className })}>
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