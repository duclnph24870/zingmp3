import PropTypes from 'prop-types';
import '../Comment.scss';

function CommentItem ({
    className = '',
}) {

    return (  
        <div className={`commentItem ${className}`}>
            <div className='commentItem-avt'>
                <img src='https://s120-ava-talk-zmp3.zmdcdn.me/1/e/6/1/30/120/f064f479041b7a6804d2e475e074706f.jpg' alt=''/>
            </div>
            <div className='commentItem-content'>
                <div className='commentItem-userName'>
                    <span>Ngọc Đức</span>
                    <span className="commentItem-timeCreate">2 giờ trước</span>
                </div>
                <div className='commentItem-message'>
                    Nhạc rất hay!!!
                </div>
            </div>
            <div className='commentItem-option'>
                <div className='commentItem-optBtn likeBtn'>
                    <i className='icon ic-like-other'></i>
                    0
                </div>
                <div className='commentItem-optBtn disLike'>
                    <i className='icon ic-dislike'></i>
                    0
                </div>
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    className: PropTypes.string,
}

export default CommentItem;