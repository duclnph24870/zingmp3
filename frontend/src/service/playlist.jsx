import request from "../utils/axios"

const selectPlaylist = async (url) => {
    try {
        let result = await request.get(url);
    
        if (result > 5) {
            result = result.slice(4);
        }

        return result;
    } catch (error) {
        console.log(error);   
    }
}

export {
    selectPlaylist
}