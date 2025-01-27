import {useState} from 'react'

const History = ({allClicks}) => {
    if(allClicks.length === 0){
        return(
            <div>
                the app is used by pressing buttons
            </div>
        )
    }

    return (
        <div>
            button press history: {allClicks.join(' ')}
        </div>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App2 = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    
    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        const newLeft = left + 1
        setLeft(newLeft)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        const newRight = right + 1
        setRight(newRight)
    }

    return (
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    )
  }

export default App2