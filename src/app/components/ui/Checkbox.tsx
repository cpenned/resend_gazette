import Check from "@/assets/Check";
import { forwardRef, useState } from "react";

type Props = {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ name, label, ...rest }, ref) => {
    const [checked, setChecked] = useState(false);

    return (
      <label className="flex items-center gap-2 relative">
        <input
          className="absolute inset-0 opacity-0 cursor-pointer peer"
          ref={ref}
          name={name}
          type="checkbox"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
          {...rest}
        />
        <div
          className={`border border-foreground peer-focus:outline-none peer-hover:ring-2 peer-focus-visible:ring-2 ring-foreground size-6 grow-0 rounded-md duration-300 ease-in-out transition-all grid place-items-center peer-checked:bg-foreground`}
        >
          <Check />
        </div>
        <p className="text-sm uppercase font-medium">{label}</p>
      </label>
    );
  }
);

export default Checkbox;

Checkbox.displayName = "Checkbox";
