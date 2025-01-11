/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.content[0].parts[0]} - {props.content[0].exercises[0]}
        <br />
        {props.content[0].parts[1]} - {props.content[0].exercises[1]}
        <br />
        {props.content[0].parts[2]} - {props.content[0].exercises[2]}
        <br />
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Total exercises: {props.total[0] + props.total[1] + props.total[2]}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content content={[{"parts": [part1, part2, part3], "exercises": [exercises1, exercises2, exercises3]}]} />
      <Total total={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App