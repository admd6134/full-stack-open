/* eslint-disable react/prop-types */
const Header = (props) => {
  return <h2>{props.course.name} </h2>;
};

const Part = (props) => {
  return (
    <>
      {props.part.name} {props.part.exercises}
      <br />
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((course) => {
        return (
          <div key={course.id}>
            <Part part={course} /> <br />{" "}
          </div>
        );
      })}
    </>
  );
};

/* const Total = (props) => {
    return (
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    );
  }; */

const Total = (props) => {
  return <strong>total of {props.total} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total
        total={course.parts.reduce((x, y) => {
          console.log(x);
          console.log(y);

          return (x += +y.exercises);
        }, 0)}
      />
    </>
  );
};

export default Course;
