/* eslint-disable react/prop-types */
const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ course: { parts } }) => {
  return (
    <div>
      {parts.map((part, index) => {
        return (
            <p key={index}>{part.name} - {part.exercises}</p>
        )
      })}
    </div>
  )
}

const Total = ({ course: { parts } }) => {
  return (
    <div>
      <p>Total exercises: {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App