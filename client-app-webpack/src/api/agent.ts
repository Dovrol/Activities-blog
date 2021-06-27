import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/Activity';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

axios.defaults.baseURL='http://localhost:5000/api';


const sleep = (delay : number) => new Promise((resolve) => setTimeout(resolve, delay))

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
})
axios.interceptors.response.use(async function(response) {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status){
        case 400:
            if (data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if (data.errors[key])
                        modalStateErrors.push(data.errors[key])
                }
                throw modalStateErrors.flat();
            }
        break;
    }
    return Promise.reject(data.errors);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;



const requests = {
    get: <T>  (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>  (url: string, body : object) => axios.post<T>(url, body).then(responseBody),
    put: <T>  (url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T>  (url: string) => axios.delete<T>(url).then(responseBody)
};

const Activities = {
    list : () => requests.get<Activity[]>('/Activities'),
    details : (id : string) => requests.get<Activity>(`/Activities/${id}`),
    create : (activity : Activity) => requests.post(`/Activities/`, activity),
    update : (activity : Activity) => requests.put(`/Activities/${activity.id}`, activity),
    delete : (activity : Activity) => requests.delete(`/Activities/${activity.id}`)
}; 

const Account = {
    current : () => requests.get<User>('/account'),
    login : (user: UserFormValues) => requests.post<User>('/account/login', user),
    register : (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
};


export default agent;