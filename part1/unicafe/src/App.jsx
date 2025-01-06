/* eslint-disable react/prop-types */
import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text} {value} <br />
    </>
  );
};
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (bad === 0 && neutral === 0 && good === 0) {
    return (
      <>
        <h1>statistics</h1>
        <br />
        no feedback given
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <br />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAverage((good + 1 - bad) / (good + 1 + bad + neutral));
    setPositive((good - bad + 1) / (good + 1));
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAverage((good - bad) / (good + bad + neutral + 1));
    setPositive((good - bad) / good);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAverage((good - bad - 1) / (good + bad + 1 + neutral));
    setPositive((good - bad - 1) / (good + 1));
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <br />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={good + bad + neutral}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
