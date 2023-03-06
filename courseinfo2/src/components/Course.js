const Parts = ({ parts }) => {
    console.log(parts);
    const total = parts.reduce((sum, part) => {
      console.log('what is happening', sum, part);
      return sum + part.exercises;
    }, 0);
    console.log(total);
    return (
      <div>
        {parts.map(part => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
        <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
      </div>
    );
  };


const Course = ({courses}) => {
    console.log(courses)
    return (
        <div>
            {courses.map(course =>
          <div key={course.id}>
            <h4>{course.name}</h4>
            <Parts parts={course.parts} />
          </div>
        )}
        </div>
        // <p>test</p>
    )
}

const Courses = ({ courses }) => {
    return (
      <div>
        <h2>
          Web Development Circulum
        </h2>
        <div>
            <Course courses = {courses} />
        </div>

      </div>
    )
  }



  export default Courses
