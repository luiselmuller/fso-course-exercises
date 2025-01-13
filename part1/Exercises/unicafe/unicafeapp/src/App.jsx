/* eslint-disable react/prop-types */
import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return (
    <div>
      <h2>Statistics</h2>
    
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={((good - bad) / total).toFixed(1)} />
          <StatisticLine text="positive" value={((good / total) * 100).toFixed(1) + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // add a click handler to each button
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      {good + neutral + bad !== 0 ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given yet</p>}

    </div>
  )
}

export default App