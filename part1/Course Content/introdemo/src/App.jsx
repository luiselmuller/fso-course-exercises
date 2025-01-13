/* eslint-disable react/prop-types */
import { useState } from 'react'
// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>You were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20
//   const name = "Peter"
//   console.log(now, a+b)
  
//   return (
//     <div>
//       <h1>Hello World, it is {now.toString()}</h1>
//       <p>
//         {a} plus {b} is {a + b}
//       </p>

//       <Hello name="John" age={30} />
//       <Hello name={name} age={a + b} />
//     </div>
//   )
// }
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onSmash, text }) => <button onClick={onSmash}>{text}</button>

const App = () => {
  const [counter, setCounter] = useState(0)

  console.log('rendering with counter value', counter)

  const increaseByOne = () => {

    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 

    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {

    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  )
} 

export default App