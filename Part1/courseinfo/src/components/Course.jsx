const Header = ({course}) => {
    return(
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({course}) => {
    const parts = course.parts
  
    return (
      <div>
        {parts.map((part) => {
          return <Part key={part.id} part={part} />
        })}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce(
      (sum, part) => (sum + part.exercises),
      0
    )
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course