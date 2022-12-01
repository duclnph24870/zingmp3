import request from '../utils/axios';

const countryService = {
    async getCountry () {
        const result = await request.get('country');

        return result.data;
    }
}

export default countryService;