import "./Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
}

function Button({ text, type }: ButtonProps) {
  return (
    <button className="button-component" type={type}>
      {text}
    </button>
  );
}

export default Button;

