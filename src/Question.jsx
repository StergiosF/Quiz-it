import FinishBtn from "./FinishBtn";
import NextButton from "./NextButton";
import Timer from "./Timer";

function Question({
  questions,
  index,
  question,
  dispatch,
  userAnswer,
  points,
  progress,
  timer,
}) {
  const totalQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div className="question-container">
      <div className="progress-container">
        <progress className="progress" value={progress} max={100} />
        <div className="progress-details">
          <span>
            Question <b>{index + 1}</b> / {totalQuestions}
          </span>
          <span>
            <b>{points}</b> / {totalPoints}
          </span>
        </div>
      </div>
      <h3 className="question">{question.question}</h3>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={
              userAnswer !== null
                ? i === question.correctOption
                  ? "btn btn-wide correct"
                  : "btn btn-wide wrong"
                : "btn btn-wide"
            }
            disabled={userAnswer !== null ? true : false}
            key={option}
            onClick={() =>
              dispatch({ type: "answer", payload: { question, i } })
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="question-addons">
        <Timer timer={timer} dispatch={dispatch} />
        {userAnswer !== null && index !== totalQuestions - 1 && (
          <NextButton dispatch={dispatch} />
        )}
        {userAnswer !== null && index === totalQuestions - 1 && (
          <FinishBtn dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}

export default Question;
