import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useNotificationDispatch} from "./components/notificationContext";
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {createAnecdote, getAnecdotes, updateAnecdote} from "./requests";

export const getId = () => (100000 * Math.random()).toFixed(0)
const App = () => {

    const dispatch = useNotificationDispatch();
    const queryClient = useQueryClient();
    const clearNotification = () => {
        setTimeout(() => {
            dispatch({type: "CLEAR"})
        }, 5000);
    }

    const newAnecdoteMutation = useMutation(createAnecdote,
        {
            onSuccess: () => {
                queryClient.invalidateQueries('anecdotes')
            },
            onError: () => {
                dispatch({type: "ERROR"});
                clearNotification();
            }});

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
        dispatch({type: "CREATE", content});
        clearNotification();
    }

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
    })

    const vote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 });
        dispatch({type: "VOTE", content: anecdote.content});
        clearNotification();
    }

  const { isLoading, isError, error, data } = useQuery('anecdotes', getAnecdotes)
  console.log(data)

    if ( isLoading ) {    return <div>loading data...</div>  }
    if ( isError ) { return <div>Anecdote service not available due to server error </div>}
    return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote }/>
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
