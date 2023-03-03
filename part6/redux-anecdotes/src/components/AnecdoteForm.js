import {createAnecdote} from "../reducers/anecdoteReducer"
import {clearMessage, setMessage} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

 const AnecdoteForm = () => {

     const dispatch = useDispatch();
     const create = async e => {
         e.preventDefault();
         let content = e.target.new.value;
         e.target.new.value = "";
         dispatch(createAnecdote(content));
         dispatch(setMessage(`You created "${content}"`));

         setTimeout(() => {
             dispatch(clearMessage());
         }, 5000)
     }

    return (
        <>
        <h2>create new</h2>
    <form onSubmit={create}>
        <div><input  name="new"/></div>
        <button >create</button>
    </form>
        </>
    )
}

 export default AnecdoteForm;
