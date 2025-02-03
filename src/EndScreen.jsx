import RestartButton from "./RestartButton";

function EndScreen({ questions, points, highscore, dispatch }) {
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  const progressPercent = Math.round((points / totalPoints) * 100);

  let emoji;
  if (progressPercent === 100) emoji = "🥇";
  if (progressPercent >= 80 && progressPercent < 100) emoji = "🎉";
  if (progressPercent >= 50 && progressPercent < 80) emoji = "🙃";
  if (progressPercent >= 0 && progressPercent < 50) emoji = "🤨";
  if (progressPercent === 0) emoji = "🤦‍♂️";

  return (
    <div className="end-screen">
      <h3>
        {emoji} You scored <b>{points}</b> out of {totalPoints} (
        {progressPercent}%)
      </h3>
      <p>(HighScore: {highscore} points)</p>
      <RestartButton dispatch={dispatch} />
    </div>
  );
}

export default EndScreen;
