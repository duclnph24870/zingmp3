import PropTypes from 'prop-types';
import './Comment.scss';
import CommentItem from './CommentItem';

function ListComment ({
    className = '',
    idSong,
}) {
    // call api để lấy dữ liệu comment
    return (  
        <div className='listComment'>
            <div className='listComment-header'>
                <div className='listComment-title'>Bình Luận</div>
                <span className='lisComment-amount'>10 Bình Luận</span>
            </div>
            <div className='listComment-content'>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
            <form className='listComment-footer'>
                <div className='listComment-footerAvt'>
                    <img src='https://s120-ava-talk-zmp3.zmdcdn.me/a/a/9/6/7/120/7b99d0c26a89db3ba884b4e427962a17.jpg' alt=''/>
                </div>
                <div className='listComment-footer-input'>
                    <input type={'text'} placeholder="Enter you comment"/>
                </div>
            </form>
        </div>
    );
}

ListComment.propTypes = {

}

export default ListComment;