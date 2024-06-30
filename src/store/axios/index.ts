import axios from "axios";
import useJwt from "../../auth/utils/useJwt";
interface CustomWindow extends Window {
    env: {
      API_URL: string;
    };
  }
  
  declare const window: CustomWindow;

const apiRequest = (
    url: string,
    method: string = 'GET',
    onSuccess: Function|null = () => { },
    data: any = null,
    headers: { [key: string]: string } =
        {
            'accept': 'application/ld+json',
            'Authorization': 'Bearer ' + useJwt.getJwt(),
        }
) => {
    
    url = window.env.API_URL + url;

    const methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    if (!methods.includes(method)) {
        method = 'GET';
    }

    if (method === 'GET') {
        // Format data to query string
        let queryString = '';
        if (data) {
            queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
        }
        if (queryString) {
            url += '?' + queryString;
        }
    }

    return new Promise((resolve, reject) => {
        axios({
            url,
            method,
            data: data,
            headers
        })
            .then((response: any) => {
                onSuccess && onSuccess(response);
                resolve(response.data['hydra:member'] || response.data || response);
            })
            .catch((error: any) => {
                reject(error);
            });
    }
    );
}

export {
    apiRequest
};

