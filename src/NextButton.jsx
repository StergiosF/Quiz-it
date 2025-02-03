function NextButton({ dispatch }) {
  return (
    <button className="btn next" onClick={() => dispatch({ type: "next" })}>
      Next
    </button>
  );
}

export default NextButton;
