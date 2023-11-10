import './Button.css';

interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return (
    <button className="button-component">
      {text}
    </button>
  );
}

export default Button;

