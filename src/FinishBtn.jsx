function FinishBtn({ dispatch }) {
  return (
    <button className="btn next" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}

export default FinishBtn;
