import request from '../utils/axios';

export const searchKeywordRealtime = async (value) => {
    const result = await request.get('/search', {
        params: {
            ...value
        }
    })

    return result.data;
}