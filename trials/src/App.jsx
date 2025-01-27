import {useState} from 'react'

const Display = ({counter}) => (<div>{counter}</div>)

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('Rendering application with counter value ' + counter)

  const increaseByOne = () => {
    console.log('Increasing, value before ' + counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('Decreasing, value before ' + counter)
    if(counter - 1 >= 0) 
      setCounter(counter - 1)
  }
  
  const setToZero = () => {
    console.log('Resetting, value before', counter)
    setCounter(0)
  }
  return (
    <div>
      <Display counter={counter} />
      <Button text='plus' onClick={increaseByOne} />
      <Button text='minus' onClick={decreaseByOne} />
      <Button text='reset' onClick={setToZero} />
    </div>
  )
}

export default App