import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <th scope='row'>{text}</th>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = () => {
    return good + neutral + bad
  }

  const average = () => {
    return (good - bad) / total()
  }

  const positivePercent = () => {
    return (good / total()) * 100
  }

  if (total() === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='total' value={total()} />
          <StatisticsLine text='average' value={average()} />
          <StatisticsLine text='positive' value={positivePercent()} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={incrementGood} text='good' />
        <Button onClick={incrementNeutral} text='neutral' />
        <Button onClick={incrementBad} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App