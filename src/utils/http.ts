import { logoutSuccess } from "@/store/auth/auth";
import { store } from "@/store/store";
import axios from "axios";

const baseURL = "https://api.agro-net.uz/api/v1"

const unAuthorizeCode = [403]

const http = axios.create({
    baseURL
})

http.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            config.headers['Authorization'] = `Bearer ${storedToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// Javob interceptorini qo'shish
http.interceptors.response.use(
    (response) => response,
    (error) => {

        return Promise.reject(error);
    }
);

const httpBaseQuery = () => async ({ url, method, data, params }: any) => {
    try {
        const result = await http({ url, method, data, params });
        return { data: result.data };
    } catch (axiosError) {
        let err: any = axiosError;

        if (unAuthorizeCode.includes(err?.response?.status)) {
            store.dispatch(logoutSuccess())

            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }


        // if (err?.code === 'ERR_NETWORK') {
        //     return {
        //         error: {
        //             status: err.response?.status,
        //             data: err.response?.data || err.message,
        //         },
        //     };
        // }

        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        };
    }
};

export const api = http

export default httpBaseQuery
