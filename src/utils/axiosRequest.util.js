import axios from "axios";

export async function axiosRequest(url, method, reqData) {
    const throwError = (res) => {
        if (res.data.hasError) {
            throw new Error(res.data.errorMessage)
        }
    }
    
    const headers = {
        'Content-Type': 'application/json'
    }
    
    switch (method) {
        case 'post': {
            const res = await axios.post(`${url}`, reqData, {headers});
            throwError(res);
            return res.data;
        }
        case 'get': {
            const res = await axios.get(`${url}`, {headers});
            throwError(res);
            return res.data;
        }
        case 'put': {
            const res = await axios.put(`${url}`, reqData, {headers});
            throwError(res);
            return res.data;
        }
        case 'delete': {
            const res = await axios.delete(`${url}`, {headers});
            throwError(res);
            return res.data;
        }
        default:
            return null;
    }
}
