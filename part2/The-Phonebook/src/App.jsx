import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numbers from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((el) => el.name === newName)) {
      const confirmUpdate = confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      if (confirmUpdate) {
        const person = persons.find((n) => n.name === newName);
        numbers
          .update(person.id, { ...person, number: newNumber })
          .then((returnedData) => {
            console.log(
              persons.map((n) => {
                return n.id === person.id ? returnedData : n;
              })
            );

            setPersons(
              persons.map((n) => {
                return n.id === person.id ? returnedData : n;
              })
            );
            setNewName("");
            setNewNumber("");
          });
        setMessage(`edited ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return;
      }
    }
    console.log("here");

    numbers
      .create({ name: newName, number: newNumber })
      .then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setNewName("");
        setNewNumber("");
        setMessage(`added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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
    numbers
      .remove(id)
      .then((returnedData) => {
        console.log(returnedData);
        setPersons(persons.filter((person) => person.id !== id));
        setMessage(
          `deleted ${persons.filter((person) => person.id === id)[0].name}`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setError(true);
        setMessage(
          `information of ${
            persons.filter((person) => person.id === id)[0].name
          } has already been removed from the server`
        );
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 5000);
      });
  };

  const namesToShow = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );
  return (
    <div>
      <Notification message={message} error={error} />
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
