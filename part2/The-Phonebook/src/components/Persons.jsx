/* eslint-disable react/prop-types */
const Persons = ({ namesToShow }) => {
  return (
    <div>
      {" "}
      <h2>Numbers</h2>
      {namesToShow.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
