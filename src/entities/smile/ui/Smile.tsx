import "./style.scss";

function Smile({
  pause,
  dead,
  win,
}: {
  pause: boolean;
  dead: boolean;
  win: boolean;
}) {
  const currentSmile = win ? "4" : dead ? "1" : pause ? "3" : "2";

  return (
    <div className="smile">
      <img src={"/src/shared/img/smile_" + currentSmile + ".svg"} alt="img" />
    </div>
  );
}

export default Smile;
