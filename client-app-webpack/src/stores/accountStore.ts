import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { UserFormLogin } from "../models/user";

export default class AccountStore
{
    constructor() {
        makeAutoObservable(this)
    }

    async login(creds: UserFormLogin)
    {
        let response = await agent.Account.login(creds);    
        console.log(response);
    }
    
}