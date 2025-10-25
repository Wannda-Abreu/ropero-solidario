import "./Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({
  text,
  type = "button",
  variant = "primary",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = [
    "button-component",
    variant === "secondary" ? "button-component--secondary" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;

