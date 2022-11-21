import request from '../utils/axios'

const getSongById = async (id) => {
    const song = await request.get(`/song/${id}`);
    return song.data;
}

export {
    getSongById,
}