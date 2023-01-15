import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { memo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { checkLikeComment } from '../../../service/comment';
import { time_distance_current2 } from '../../../service/timeService';
import request from '../../../utils/axios';
import '../Comment.scss';

function CommentItem ({
    className = '',
    data,
    setCommentList,
}) {
    const idUserSignIn = localStorage.getItem('idUser');
    const commentItemEl = useRef();
    const [dataRender,setDataRender] = useState(data);
    const checkLike = checkLikeComment(dataRender.like || []);
    const checkDisLike = checkLikeComment(dataRender.disLike || []);

    const handleDeleteComment = async (e) => {
        try {
            const result = await request.post('/comment/delete/'+ dataRender._id);
            toast.success(result.message);

            setCommentList(curr => {
                return curr.filter(item => item._id !== dataRender._id);
            })
        } catch (error) {
            console.log(error);
            return toast.error('Lỗi server')
        }
    }

    const actionLikeComment = async () => {
        let result = null;
        if (!idUserSignIn) {
            return toast.warn('Bạn cần đăng nhập để sử dụng chức năng này')
        }
        if (checkLike) {
            result = await request.post('/comment/like/'+ dataRender._id +'?type=unlike');
        }else {
            result = await request.post('/comment/like/'+ dataRender._id +'?type=like');
        }

        return result.newComment ? setDataRender(result.newComment) : undefined;
    }

    const actionDisLikeComment = async () => {
        if (!idUserSignIn) {
            return toast.warn('Bạn cần đăng nhập để sử dụng chức năng này')
        }
        let result = null;
        if (checkDisLike) {
            result = await request.post('/comment/like/'+ dataRender._id +'?type=unDislike');
        }else {
            result = await request.post('/comment/like/'+ dataRender._id +'?type=disLike');
        }

        return result.newComment ? setDataRender(result.newComment) : undefined;
    }
    return (  
        <div ref={commentItemEl} className={`commentItem ${className}`}>
            <div className='commentItem-avt'>
                <img src={dataRender.idUser.image} alt=''/>
            </div>
            <div className='commentItem-content'>
                <div className='commentItem-userName'>
                    <span>{dataRender.idUser.userName}</span>
                    <span className="commentItem-timeCreate">{time_distance_current2(dataRender.createdAt)}</span>
                    {
                        idUserSignIn === dataRender.idUser._id 
                            &&
                        <Popconfirm
                            placement="topLeft"
                            title={'Bạn chắc chắn muốn xóa bình luận này?'}
                            description={'Bình luận sẽ được xóa vĩnh viễn'}
                            onConfirm={handleDeleteComment}
                            okText="Xóa"
                            cancelText="Bỏ qua"
                        >
                            <span className='commentItem-delete'>
                                <i className='icon ic-delete'></i>
                            </span>
                        </Popconfirm>
                    }
                </div>
                <div className='commentItem-message'>
                    {dataRender.content}
                </div>
            </div>
            <div className='commentItem-option'>
                <div className={`commentItem-optBtn likeBtn ${checkLike && 'active'}`} onClick={actionLikeComment}>
                    <i className='icon ic-like-other'></i>
                    {dataRender.like.length}
                </div>
                <div className={`commentItem-optBtn disLike ${checkDisLike && 'active'}`} onClick={actionDisLikeComment}>
                    <i className='icon ic-dislike'></i>
                    {dataRender.disLike.length}
                </div>
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
    setCommentList: PropTypes.func,
}

export default memo(CommentItem);