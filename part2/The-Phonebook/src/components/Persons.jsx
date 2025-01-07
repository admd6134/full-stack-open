/* eslint-disable react/prop-types */
const Persons = ({ namesToShow, handleRemove }) => {
  return (
    <div>
      {" "}
      <h2>Numbers</h2>
      {namesToShow.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleRemove(person.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
