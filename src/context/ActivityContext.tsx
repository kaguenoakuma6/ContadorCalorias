import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
    children: ReactNode;
}

type ActivityContextProps = {
    state: ActivityState;
    dispatch: Dispatch<ActivityActions>;
    caloriesConusumed: number;
    caloriesBourned: number;
    netCalories: number;
    categoryName: (category: Activity["category"]) => string[];
    isEmptyActivity: boolean;
    
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    const [ state, dispatch ] = useReducer(activityReducer, initialState);

    const caloriesConusumed = useMemo( () => state.activities.reduce( (total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [state.activities] );
    const caloriesBourned = useMemo( () => state.activities.reduce( (total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [state.activities] );
    const netCalories = useMemo( () => caloriesConusumed - caloriesBourned , [state.activities]);

    const categoryName = useMemo( () => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : ''), [state.activities]);

    const isEmptyActivity = useMemo(() => state.activities.length === 0 ,[state.activities]);

    return (
        <ActivityContext.Provider value={{ state, dispatch, caloriesConusumed, caloriesBourned, netCalories, categoryName, isEmptyActivity }}>
            { children }
        </ActivityContext.Provider>
    )
}