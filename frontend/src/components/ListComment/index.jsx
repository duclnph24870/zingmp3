import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { time_distance_current } from '../../service/timeService';
import request from '../../utils/axios';
import './Comment.scss';
import CommentItem from './CommentItem';
import { changeLoading } from '../../store/actions/appActions'

function ListComment ({
    className = '',
    idSong,
    mainController
}) {
    // call api để lấy dữ liệu comment
    const [commentList, setCommentList] = useState([]);
    const [commentValue,setCommentValue] = useState('');
    const {userReducer,appReducer} = useSelector(state => state);
    const user = userReducer.user;
    const dispath = useDispatch();

    if (mainController) {
        idSong = appReducer.songSetting.idSong;
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await request.get('/comment/'+ idSong);
                setCommentList(result.comment ? result.comment : []);
            } catch (error) {
                console.log(error);
                toast.error('Lỗi server, vui lòng thử lại');
            }
        })();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const timeCommentOld = time_distance_current(JSON.parse(sessionStorage.getItem('timeCommentOld')));
        if (commentValue.length < 3) {
            return toast.warn('Nội dung bình luận ít nhất phải có 3 ký tự');
        }

        if (timeCommentOld) {
            try {
                dispath(changeLoading(true))
                const result = await request.post('/comment/create',{
                    content: commentValue,
                    idSong: idSong,
                    idUser: user._id,
                });

                setCommentList(curr => {
                    curr.unshift(result.newComment)
                    return curr;
                });

                dispath(changeLoading(false))
                toast.success(result.message);
                sessionStorage.setItem('timeCommentOld', JSON.stringify(new Date()));
                setCommentValue('');
            } catch (error) {
                dispath(changeLoading(false))
                console.log(error);
                toast.error('Lỗi server');
            }
        }else {
            return toast.warn('Bạn đang bình luận quá nhanh');
        }
    }

    return (  
        <div className='listComment'>
            <div className='listComment-header'>
                <div className='listComment-title'>Bình Luận</div>
                <span className='lisComment-amount'>{commentList.length} Bình Luận</span>
            </div>
            <div className='listComment-content'>
                {
                    commentList.length > 0
                    ?
                        commentList.map((item, index) => (
                            <CommentItem 
                                setCommentList={setCommentList}
                                key={item._id}
                                data={item}
                            />
                        ))
                    :
                    <div className="emtyComment">
                        <i className='icon ic-comment'></i>
                        <span>Chưa có bình luận nào</span>
                    </div>
                }
            </div>

            {
                user._id 
                    &&
                <form onSubmit={handleSubmit} className='listComment-footer'>
                    <div className='listComment-footerAvt'>
                        <img src={user.image} alt=''/>
                    </div>
                    <div className='listComment-footer-input'>
                        <input value={commentValue} onChange={e => setCommentValue(e.target.value)} type={'text'} placeholder="Enter you comment"/>
                    </div>
                </form>
            }
        </div>
    );
}

ListComment.propTypes = {
    idSong: PropTypes.string,
    className: PropTypes.string,
    mainController: PropTypes.bool
}

export default ListComment;