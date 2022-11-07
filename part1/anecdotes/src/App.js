import {useEffect, useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [max, setMax] = useState(0);


  const handleClick = (e) => {
      // e.preventDefault()
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleVote = (e) => {
      // e.preventDefault()
    const newArr = [...votes];
    newArr[selected] += 1;
    setVotes(newArr);
    // setMax(findMaxIndex(newArr));
  }

  useEffect(() => {
    setMax(findMaxIndex(votes));
  }, [votes]);

  const findMaxIndex = (arr) => {
    let count = 0;
    let maxIndex = 0;
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>

        <button onClick={handleVote}>Vote</button>
        <button onClick={handleClick}>Next</button>

        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[max]}</p>
        <p>has {votes[max]} votes</p>
      </div>
  )
}

export default App