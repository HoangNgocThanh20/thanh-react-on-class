import apiClient from './apiService';

const getData = {
    getProducts() {
        return apiClient.request({
            method: 'GET',
            url: 'products',
          });
    },
}

export default getData