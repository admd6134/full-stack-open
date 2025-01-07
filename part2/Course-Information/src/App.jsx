/* eslint-disable react/prop-types */
const Header = (props) => {
  return <h1>{props.course.name} </h1>;
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
  return <>total of {props.total}</>;
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
          
          return x += +(y.exercises);
        },0)}
      />
    </>
  );
};

/* const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App; */

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
