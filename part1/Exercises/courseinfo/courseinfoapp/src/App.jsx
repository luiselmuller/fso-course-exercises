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
        {props.parts[0].name}: {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].name}: {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].name}: {props.parts[2].exercises}
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total total={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App