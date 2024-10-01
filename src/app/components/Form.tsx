"use client";
import { sendEmail } from "@/actions/sendEmail";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { TextInput } from "./input";
import { Checkbox } from "./Checkbox";

const textInputs = ["name", "email"];

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-md transition-all bg-foreground text-background hover:bg-accent/80 font-medium text-sm sm:text-base ~h-10/12 ~px-4/5 focus:outline-none focus-visible:ring-2 ring-foreground ring-offset-2 ring-offset-background duration-300 ease-in-out [user-select:none] cursor-pointer"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </button>
  );
};

const Form = () => {
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, formAction] = useFormState(sendEmail, null);

  useEffect(() => {
    if (state?.errors) {
      setErrors(state.errors);
    }

    if (state?.success) {
      setShowForm(false);
    }
  }, [state]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!errors[event.target.name]) {
      return;
    }
    setErrors((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  return (
    <>
      {showForm ? (
        <form className="grid gap-4 w-full max-w-xs" action={formAction}>
          <div className="grid gap-2 bg-overlay ~py-3/4 ~px-3/4 rounded-xl">
            {textInputs.map((name) => (
              <TextInput
                key={name}
                name={name}
                type={name === "email" ? "email" : "text"}
                onInput={handleInput}
                errorMessage={errors[name]}
              />
            ))}
          </div>
          <div className="grid gap-2 bg-overlay ~py-3/4 ~px-3/4 rounded-xl">
            <Checkbox name="philosophy" label="Send me Resend’s philosophy" />
          </div>
          <div className="grid gap-2 bg-overlay ~py-3/4 ~px-3/4 rounded-xl">
            <FormButton />
          </div>
          <p className="sr-only" aria-live="polite" role="status">
            {state?.message}
          </p>
        </form>
      ) : (
        <p>Thank you for your submission!</p>
      )}
    </>
  );
};
export default Form;
