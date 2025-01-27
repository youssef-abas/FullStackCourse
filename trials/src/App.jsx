import {useState} from 'react'

const Display = (props) => {
  return (<div>{props.counter}</div>)
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => {
    if(counter - 1 >= 0) 
      setCounter(counter - 1)
  }
  
  const setToZero = () => setCounter(0)
  
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