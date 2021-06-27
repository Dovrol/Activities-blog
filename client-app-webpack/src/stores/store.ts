import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

interface Store {
    activityStore: ActivityStore,
    accountStore: AccountStore,
    commonStore: CommonStore,
    modalStore: ModalStore
}

export const store : Store =  {
    activityStore : new ActivityStore(),
    accountStore : new AccountStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);


export function useStore(){
    return useContext(StoreContext);
}