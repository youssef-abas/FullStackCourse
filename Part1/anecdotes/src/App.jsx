import { useState } from 'react'

const findLargest = (arr) => {
  let largest = arr[0]
  let largestIndex = 0

  for(let i = 1; i < arr.length; i++){
    if(arr[i] > largest){
      largest = arr[i]
      largestIndex = i
    }
  }

  return largestIndex
}

const Anecdote = ({anecdote, voteCount}) => {
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {voteCount}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeQuote = () => {
    const newSelection = Math.floor(Math.random() * anecdotes.length)
    console.log(newSelection)
    setSelected(newSelection)
  }

  const updateVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  let mostVoted = findLargest(votes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} voteCount={votes[selected]} />

      <button onClick={changeQuote}>
        next anecdote
      </button>
      <button onClick={updateVotes}>
        vote
      </button>

      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted]} voteCount={votes[mostVoted]} />
    </div>
  )
}

export default App