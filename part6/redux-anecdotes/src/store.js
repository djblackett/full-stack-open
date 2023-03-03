import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import {configureStore} from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import {setAnecdotes} from "./reducers/anecdoteReducer";
import anecdoteService from './services/anecdotes'



export const store = configureStore(
    {reducer:
            {
                anecdotes: anecdoteReducer,
                filter: filterReducer,
                notification: notificationReducer,
            }});


anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)));
