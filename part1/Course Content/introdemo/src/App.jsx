/* eslint-disable react/prop-types */
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  const name = "Peter"
  console.log(now, a+b)
  
  return (
    <div>
      <h1>Hello World, it is {now.toString()}</h1>
      <p>
        {a} plus {b} is {a + b}
      </p>

      <Hello name="John" age={30} />
      <Hello name={name} age={a + b} />
    </div>
  )
}

export default App