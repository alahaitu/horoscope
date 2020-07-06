import React, {useState} from "react";
import {Radar} from "react-chartjs-2";
import {useForm} from "react-hook-form";

function App() {
  const [isFinished, setIsFinished] = useState(false);
  const { register, handleSubmit } = useForm();
  const questions = [
    {
      questionText: "This is Question 1",
      questionName: "q1",
      questionOptions: ["20", "40", "90"],
    },
    {
      questionText: "This is Question 2",
      questionName: "q2",
      questionOptions: ["20", "40", "90"],
    },
    {
      questionText: "This is Question 3",
      questionName: "q3",
      questionOptions: ["20", "40", "90"],
    },
    {
      questionText: "This is Question 4",
      questionName: "q4",
      questionOptions: ["20", "40", "90"],
    },
    {
      questionText: "This is Question 5",
      questionName: "q5",
      questionOptions: ["20", "40", "90"],
    },
    {
      questionText: "This is Question 6",
      questionName: "q6",
      questionOptions: ["20", "40", "90"],
    },
  ];
  const onSubmit = (data) => {
    setIsFinished(true);
    setData({
      ...initData,
      datasets: [
        {
          label: "My dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [data.q1, data.q2, data.q3, data.q4, data.q5],
        },
      ],
    });
  };
  const initData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding"],
    datasets: [],
  };
  const options = {
    scale: {
      pointLabels: {
        display: false,
      },
      angleLines: {
        display: false,
      },
      ticks: {
        display: false,
      },
      gridLines: {
        display: true,
      },
    },
  };
  const [data, setData] = useState(initData);

  const Question = (props) => {
    return (
      <div className="py-4">
        <p className="py-2 text-base text-gray-700 leading-normal">
          {props.questionText}
        </p>
        <select
          name={props.questionName}
          ref={register}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>20</option>
          <option>60</option>
          <option>90</option>
        </select>
      </div>
    );
  };

  const SubmitButton = () => {
    return (
      <div className="py-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    );
  };

  const ResetButton = () => {
    return (
      <div className="py-4">
        <button
          onClick={() => setIsFinished(false)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="ml-6 pt-1">
        <h1 className="text-2xl text-blue-700 leading-tight">
          A Nice Questionnaire
        </h1>
        {!isFinished ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            {questions.map((question) => (
              <Question
                key={question.questionName}
                questionText={question.questionText}
                questionName={question.questionName}
              />
            ))}
            <SubmitButton />
          </form>
        ) : (
          <div className="p-4">
            {data.datasets[0]?.data && data.datasets[0].data.length > 0 && (
              <Radar data={data} options={options} />
            )}
            <div className="mx-auto">
              <ResetButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
