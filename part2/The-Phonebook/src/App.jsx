import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numbers from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (JSON.stringify(persons).includes(JSON.stringify({ name: newName }))) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    numbers
      .create({ name: newName, number: newNumber })
      .then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    console.log("effect");
    numbers.getAll().then((returnedData) => {
      setPersons(returnedData);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleRemove = (id) => {
    const confirmDelete = confirm(
      `delete ${persons.filter((person) => person.id === id)[0].name} ?`
    );
    if (!confirmDelete) return;
    numbers.remove(id).then((returnedData) => {
      console.log(returnedData);
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const namesToShow = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons namesToShow={namesToShow} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
