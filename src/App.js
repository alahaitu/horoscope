import React, {useState} from "react";
import {Radar} from "react-chartjs-2";

function App() {
  // the index number of the question that is being asked
  const [count, setCount] = useState(0);

  // the current answer that the user has selected
  const [selection, setSelection] = useState(0);

  // target values that are always the same
  const targetValues = [10, 20, 30, 40];

  // values that are changed by answering questions, by default same as target values
  const [userValues, setUserValues] = useState(targetValues);

  // these are the questions that are asked in this order
  const questions = [
    {
      questionText: "This is Question 1",
      questionOptions: [
        { text: "This is question 1 text 1", value: 20 },
        { text: "This is question 1 text 2", value: 40 },
        { text: "This is question 1 text 2", value: 60 },
      ],
      dimension: "beta",
    },
    {
      questionText: "This is Question 2",
      questionOptions: [
        { text: "This is question 2 text 1", value: 20 },
        { text: "This is question 2 text 2", value: 40 },
        { text: "This is question 2 text 2", value: 60 },
      ],
      dimension: "omega",
    },
  ];

  // the dimensions in the chart thingie
  const labels = ["alpha", "beta", "gamma", "omega"];

  const data = {
    labels: labels,
    datasets: [
      // this is the "target" data that always stays the same
      {
        backgroundColor: "gray",
        borderColor: "gray",
        label: "target",
        data: targetValues,
      },
      // this is the data that changes when users answers questions
      {
        backgroundColor: "yellow",
        borderColor: "yellow",
        label: "user",
        data: userValues,
      },
    ],
  };

  // chart configurations
  const options = {
    maintainAspectRatio: true,
    spanGaps: false,
    elements: {
      line: {
        tension: 0.000001,
      },
    },
  };

  // run every time user selects an option
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelection(
      questions[count].questionOptions.findIndex(
        (option) => option.value === selectedValue
      )
    );
  };

  // run when the user presses submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    setCount(count + 1);
    // copy old user values and change the selected value
    const newUserValues = [...userValues];
    // newUserValues[count] = questions[count].questionOptions[selection].value;
    setUserValues(newUserValues);
  };

  // html for asking questions
  const question = (
    <div>
      <p>{questions[count]?.questionText}</p>
      {questions[count]?.questionOptions.map((option, index) => (
        <div key={index}>
          <label>
            {option.text}
            <input
              type="radio"
              value={option.value}
              onChange={handleChange}
              checked={
                option.value ===
                questions[count].questionOptions[selection].value
              }
            />
          </label>
          <br />
        </div>
      ))}
      <br />
      <input type="submit" value="Submit" />
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div></div>
        {/* if current question is smaller than question array length 
        ask question, otherwise show ending text */}
        {count < questions.length ? question : <p>Finished</p>}
      </form>
      <Radar data={data} options={options} />
    </>
  );
}

export default App;
