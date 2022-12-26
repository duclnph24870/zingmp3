import request from '../utils/axios';

const getSongById = async (id) => {
    try {
        const song = await request.get(`/song/${id}`);
        return song;
    } catch (error) {
        return error;
    }
}

const actionSong = (isRandom,playListSong,action,currSongId) => {
    const indexCurrSong = playListSong.findIndex(item => item._id === currSongId);
    let result = null;

    if (action === 'next' && !isRandom) {
        let indexNext = indexCurrSong + 1;

        if (indexNext >= playListSong.length) {
            indexNext = 0;
        }

        result = playListSong[indexNext];
        
    }else if ( action === 'prev' && !isRandom) {
        let indexPrev = indexCurrSong - 1;

        if (indexPrev < 0) {
            indexPrev = playListSong.length - 1;
        }

        result = playListSong[indexPrev];
    }else if (isRandom) {
        const songListNew = playListSong.filter(item => item._id !== currSongId);
        const indexRandom = Math.floor(Math.random() * songListNew.length);
        result = songListNew[indexRandom];
    }

    return result;
}

const checkLiked = (idSong,likedList) => {
    if (likedList) {
        const check = likedList.find(item => item === idSong);
        return check ? true : false;
    }

    return false;
}

export {
    getSongById,
    actionSong,
    checkLiked
}