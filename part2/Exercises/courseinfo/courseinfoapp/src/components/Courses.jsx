/* eslint-disable react/prop-types */

// Already had separate module
const Header = ({ course }) => {
    return (
      <div>
        <h2>{course.name}</h2>
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
        {/* Using reduce to count exercises */}
        <p>Total exercises: {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
      </div>
    )
  }
  
  const Courses = ({ course }) => {
    return (
      <div>
        {course.map(course => (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        ))}
      </div>
    )
  }
export default Courses
