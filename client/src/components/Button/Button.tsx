import "./Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

function Button({ text, type, onClick, className }: ButtonProps) {
  return (
    <button className={`button-component ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
