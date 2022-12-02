import request from '../utils/axios'

const getSongById = async (id) => {
    try {
        const song = await request.get(`/song/${id}`);
        return song;
    } catch (error) {
        return error;
    }
}

export {
    getSongById,
}