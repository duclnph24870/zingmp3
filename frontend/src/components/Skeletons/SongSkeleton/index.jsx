import { Skeleton, Space } from 'antd';
import PropTypes from 'prop-types';
import '../Skeleton.scss';

function SongSkeleton({
    width = '100%'
}) {
    return (
        <div className="songSkeleton" style={{
            width
        }}>
            <Skeleton.Avatar 
                active={true}
                className='songSkeleton-image'
            />
            <Skeleton 
                active={true}
                paragraph={{
                    rows: 2
                }}
            />

        </div>
    );
}

export default SongSkeleton;