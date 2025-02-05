import { useEffect, useReducer } from "react";
import Header from "./Header";
import Container from "./Container";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Loader from "./Loader";
import EndScreen from "./EndScreen";

const initialState = {
  questions: [],
  isLoading: false,
  error: null,

  // loading, error, start, end, question
  status: "",
  index: 0,
  userAnswer: null,
  points: 0,
  progress: 0,
  highscore: 0,
  timer: 450,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading", isLoading: true };
    case "error":
      return {
        ...state,
        status: "error",
        isLoading: false,
        error: action.payload,
      };
    case "completeFetch":
      return {
        ...state,
        status: "start",
        isLoading: false,
        questions: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "question",
      };
    case "answer":
      return {
        ...state,
        userAnswer: action.payload.i,
        points:
          action.payload.i === action.payload.question.correctOption
            ? state.points + action.payload.question.points
            : state.points,
        progress:
          action.payload.i !== null
            ? Math.round((state.index + 1) * (100 / state.questions.length))
            : 0,
      };
    case "timer":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer < 2 ? "end" : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "next":
      return { ...state, index: state.index + 1, userAnswer: null };
    case "finish":
      return {
        ...state,
        status: "end",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "start",
      };
  }
}

export default function App() {
  const [
    {
      questions,
      error,
      status,
      index,
      userAnswer,
      points,
      progress,
      highscore,
      timer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("https://quiz-it-r4s0.onrender.com/questions");

        const data = await res.json();

        dispatch({ type: "completeFetch", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Container>
        {status === "start" && <StartScreen dispatch={dispatch} />}

        {status === "question" && (
          <Question
            questions={questions}
            index={index}
            question={questions.at(index)}
            dispatch={dispatch}
            userAnswer={userAnswer}
            points={points}
            progress={progress}
            timer={timer}
          />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error error={error} />}
        {status === "end" && (
          <EndScreen
            questions={questions}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
            timer={timer}
          />
        )}
      </Container>
    </div>
  );
}
