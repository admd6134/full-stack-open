/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(8).fill(0));
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    if (copy[selected] + 1 <= votes[mostVotedIndex]) return;
    setMostVotedIndex(selected);
  };

  const handleShowNext = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleShowNext} text="next anecdote" />
      <h1>anecdote with the most votes</h1> <br />
      {anecdotes[mostVotedIndex]}
      <br />
      has {votes[mostVotedIndex]} votes
    </div>
  );
};

export default App;
