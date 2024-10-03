import { useFormStatus } from "react-dom";

const FormButton = ({
  variant = "primary",
  text,
  pendingText,
}: {
  variant?: "primary" | "danger";
  text: string;
  pendingText: string;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`rounded-md transition-all bg-foreground text-background font-medium text-sm sm:text-base ~h-10/12 ~px-4/5 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-background duration-300 ease-in-out [user-select:none] cursor-pointer ${
        variant === "primary"
          ? "hover:bg-accent/80 ring-foreground focus-visible:bg-accent/80 hover:shadow-accent/20 shadow-xl"
          : "hover:bg-red-500 ring-red-500 focus-visible:bg-red-500 hover:shadow-red-500/20 shadow-xl"
      }`}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? pendingText : text}
    </button>
  );
};

export default FormButton;
