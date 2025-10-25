import React from "react";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  className,
  ...inputProps
}) => {
  const inputId =
    id ||
    `input-${label.toLowerCase().replace(/\s+/g, "-")}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`inputField${error ? " inputField--error" : ""}`}>
      <label htmlFor={inputId}>{label}</label>

      <input
        id={inputId}
        className={className}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        {...inputProps}
      />
      {error && (
        <span className="inputField__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
