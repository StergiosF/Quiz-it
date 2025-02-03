function StartScreen({ dispatch }) {
  return (
    <>
      <div className="start-message">
        <h1>Welcome to the React Quiz</h1>
        <p>15 questions to test your mastery at React</p>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        START
      </button>
    </>
  );
}

export default StartScreen;
