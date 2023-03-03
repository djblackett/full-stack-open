import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import {useEffect} from "react";
import {setAnecdotes} from "./reducers/anecdoteReducer";
import anecdoteService from './services/anecdotes'
import {useDispatch, useSelector} from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import {selectNotification} from "./reducers/notificationReducer";

const App = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(initializeAnecdotes());
        }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification />
        <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
