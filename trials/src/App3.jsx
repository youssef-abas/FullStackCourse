import {useState} from 'react'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App3 = () => {
    const [value, setValue] = useState(0)
    
    const setToValue = (newValue) => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            <div>
                {value}
            </div>
            <div>
                <Button onClick={() => setToValue(1000)} text='set to 1k' />
                <Button onClick={() => setToValue(0)} text='reset' />
                <Button onClick={() => setToValue(value + 1)} text='increment' />
            </div>
        </div>
    )
  }

export default App3