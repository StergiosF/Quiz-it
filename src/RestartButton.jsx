function RestartButton({ dispatch }) {
  return (
    <button className="btn" onClick={() => dispatch({ type: "restart" })}>
      Restart Quiz
    </button>
  );
}

export default RestartButton;
