import { forwardRef, useState } from "react";

type Props = {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ name, label, ...rest }, ref) => {
    const [checked, setChecked] = useState(false);

    return (
      <label className="flex items-center gap-2 relative">
        <input
          className="absolute inset-0 opacity-0 cursor-pointer peer"
          ref={ref}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          {...rest}
        />
        <div
          className={`border border-foreground peer-focus:outline-none peer-hover:ring-2 peer-focus-visible:ring-2 ring-foreground size-6 grow-0 rounded-md duration-300 ease-in-out transition-all grid place-items-center peer-checked:bg-foreground`}
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-background"
              fillRule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353l4.493-6.74a.75.75 0 0 1 1.04-.207"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm uppercase font-medium">{label}</p>
      </label>
    );
  }
);

Checkbox.displayName = "Input";
