import "./style.scss";

function Button({ callback, text }: { callback: () => void; text: string }) {
  return (
    <button className="button" onClick={() => callback()}>
      {text}
    </button>
  );
}

export default Button;
