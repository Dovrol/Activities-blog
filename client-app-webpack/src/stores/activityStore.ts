import { action, makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/Activity";


export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activityByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get activityDateGroup(){
        return Object.entries(
            this.activityByDate.reduce((group, activity) =>{
            let date = activity.date;
            if(group[date]){
                group[date] = [...group[date], activity]
            } else{
                group[date] = [activity]
            }
            return group;
        }, {} as {[key: string]: Activity[]}))
    }

    loadActivityToRegister(activity: Activity) {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id, activity)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(x => this.loadActivityToRegister(x));
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        this.setLoadingInitial(true);
        try {
            if (!activity) {
                activity = await agent.Activities.details(id);
                this.loadActivityToRegister(activity);
            }
            this.selectActivity(activity.id);

        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }

        return activity;
    }

    private getActivity(id: string) {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelActivity = () => {
        this.selectedActivity = undefined;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                if (this.selectedActivity?.id == activity.id) this.cancelActivity;
                this.editMode = false;
                this.selectedActivity = activity;
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    deleteActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(activity);
            runInAction(() => {
                this.activityRegistry.delete(activity.id);
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }



}
