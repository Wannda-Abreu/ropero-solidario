
const BASE_URL = 'http://localhost:3000/'; 

export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: string;
}

    export const handleRequestError = (error: Error): unknown => {
        console.error('Error de solicitud:', error.message);
        throw error;
};

    export const request = async (url: string, options: RequestOptions) => {
    
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        if (!response.ok) {
            throw new Error(`Respuesta no exitosa: ${response.status}`);
    }
        return response.json();
    } catch (error) {
        handleRequestError(error);
        throw error;
    }
};

    export const get = async (url: string) => {
    return request(url, { method: 'GET' });
};

    export const remove = async (url: string) => {
        return request(url, { method: 'DELETE' });
};

    export const put = async (url: string, data: unknown) => {
        const options: RequestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
        };
            return request(url, options);
};

    export const post = async (url: string, data: unknown) => {
    const options: RequestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(data),
    };

    return request(url, options);
};
