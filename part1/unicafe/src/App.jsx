/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    setAverage((good + 1 - bad) / (good + 1 + bad + neutral))
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAverage((good - bad) / (good + bad + neutral + 1))
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAverage((good - bad - 1) / (good + bad + 1 + neutral))
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <br />
      <h1>statistics</h1>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
      all {good + bad + neutral}
      <br />
      average {average}
      <br />
      positive {(good - bad) / good}
    </div>
  );
};

export default App;
