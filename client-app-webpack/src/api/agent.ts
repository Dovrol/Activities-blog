import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/Activity';
import { User, UserFormLogin } from '../models/user';

axios.defaults.baseURL='http://localhost:5000/api';


const sleep = (delay : number) => new Promise((resolve) => setTimeout(resolve, delay))

axios.interceptors.response.use(async function(response) {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    login : (creds: UserFormLogin) => requests.post<User>('/account/login', creds),
    register : (creds: UserFormLogin) => requests.post<User>('/account/register', creds)
}

const agent = {
    Activities,
    Account
};


export default agent;