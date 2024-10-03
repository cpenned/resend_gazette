import { forwardRef } from "react";

type Props = {
  name: string;
  errorMessage?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, onInput, name, ...rest }, ref) => {
    return (
      <label className="grid gap-1">
        <p className="ml-2 text-sm uppercase font-medium flex gap-0.5">
          <span>{name}</span>
          {rest.required && <span className="text-red-500">*</span>}
        </p>
        <input
          className={`w-full border border-foreground focus:outline-none focus-visible:ring-2 ring-foreground py-1.5 px-2 rounded-md bg-overlay duration-300 ease-in-out transition-all ${
            errorMessage && "border-red-500 ring-red-500"
          }`}
          ref={ref}
          name={name}
          onInput={onInput}
          {...rest}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm ml-2">{errorMessage}</p>
        )}
      </label>
    );
  }
);

export default TextInput;

TextInput.displayName = "TextInput";
