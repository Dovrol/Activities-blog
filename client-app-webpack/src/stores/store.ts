import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore,
    accountStore: AccountStore

}

export const store : Store =  {
    activityStore : new ActivityStore(),
    accountStore : new AccountStore()
}

export const StoreContext = createContext(store);


export function useStore(){
    return useContext(StoreContext);
}