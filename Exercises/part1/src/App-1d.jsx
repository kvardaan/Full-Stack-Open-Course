import { useState, useEffect } from "react";

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const Heading = ({ text }) => <h1>{text}</h1>;

const StatiscLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const StatisticsTable = ({ statistics }) => {
  return (
    <table>
      <tbody>
        {Object.entries(statistics).map(([name, value]) => (
          <StatiscLine key={name} text={name} value={value} />
        ))}
      </tbody>
    </table>
  );
};

const Statistics = ({ statistics }) => {
  return <StatisticsTable statistics={statistics} />;
};

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function App_1d() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total,
    positive: total === 0 ? 0 : (good / total) * 100,
  };

  const hasFeedback = total > 0;

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

  const [votes, setVotes] = useState({});
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(null);

  const handleVote = () => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      updatedVotes[anecdotes[selected]]++;

      let maxVotes = 0;
      let maxVotedAnecdote = null;
      Object.entries(updatedVotes).forEach(([anecdote, voteCount]) => {
        if (voteCount > maxVotes) {
          maxVotes = voteCount;
          maxVotedAnecdote = anecdote;
        }
      });
      setMostVotedAnecdote(maxVotedAnecdote);

      return updatedVotes;
    });
  };

  const [selected, setSelected] = useState(0);

  const handleNextAnecdote = () => setSelected(getRandomIntInclusive(0, anecdotes.length - 1));

  // initializes votes directly in the component
  if (Object.keys(votes).length === 0) {
    const initialVotes = {};
    anecdotes.forEach((anecdote) => {
      initialVotes[anecdote] = 0;
    });
    setVotes(initialVotes);
  }

  return (
    <>
      <Heading text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Heading text="statistics" />
      {hasFeedback ? <Statistics statistics={statistics} /> : <p>No feedback given</p>}
      <hr />
      <Heading text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[anecdotes[selected]]} votes</p>
      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleNextAnecdote} />
      <Heading text="Anecdote with most votes" />
      {mostVotedAnecdote ? (
        <>
          <p>{mostVotedAnecdote}</p>
          <p>has {votes[mostVotedAnecdote]} votes</p>
        </>
      ) : (
        <p>No anecdotes voted yet</p>
      )}
    </>
  );
}

export default App_1d;
