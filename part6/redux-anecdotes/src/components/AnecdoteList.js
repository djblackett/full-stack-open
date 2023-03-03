import {useDispatch, useSelector} from "react-redux";
import {addVote, selectAnecdotes, voteForAnecdote} from "../reducers/anecdoteReducer";
import {selectFilter} from "../reducers/filterReducer";
import {clearMessage, setMessage, setNotification} from "../reducers/notificationReducer";


const AnecdoteList = () => {

    const filter = useSelector(selectFilter);

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteForAnecdote(anecdote));
        dispatch(setNotification({message: `You voted for "${anecdote.content}"`,  delay: 5 }));
    }

    const anecdotes = useSelector(selectAnecdotes)
    // I can avoid this with useEffect
    const anecdotes1 = [...anecdotes];
    console.log(anecdotes)
    const dispatch = useDispatch();

    return anecdotes1.sort((a, b) => b.votes - a.votes)
        .filter(anecdote => {
            if (filter === "") {
                return true;
            } else {
                return anecdote.content.includes(filter);
            }
        })
        .map(anecdote => (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>)
        )
    }



export default AnecdoteList;
