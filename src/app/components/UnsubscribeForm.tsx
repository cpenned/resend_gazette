"use client";

import { unsubscribeEmail } from "@/actions/unsubscribeEmail";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Button from "./ui/FormButton";
import TextInput from "./ui/TextInput";
import Wrapper from "./ui/Wrapper";

const UnsubscribeForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, unsubscribeAction] = useFormState(unsubscribeEmail, null);

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

  const searchParams = useSearchParams();

  return (
    <>
      {showForm ? (
        <form className="grid gap-4 w-full max-w-xs" action={unsubscribeAction}>
          <div className="text-center">
            <h1 className="text-3xl font-bold">The Resend Gazette</h1>
            <p className="text-pretty">
              If you no longer want to receive updates, please unsubscribe
              below.
            </p>
          </div>
          <Wrapper>
            <TextInput
              name="email"
              type="email"
              onInput={handleInput}
              defaultValue={searchParams.get("email") || ""}
              errorMessage={errors.email}
              placeholder="Enter your email"
              required
              autoFocus
              autoComplete="email"
            />
          </Wrapper>
          <Wrapper>
            <Button
              variant="danger"
              text="Unsubscribe"
              pendingText="Unsubscribing..."
            />
          </Wrapper>
          <p className="sr-only" aria-live="polite" role="status">
            {state?.message}
          </p>
        </form>
      ) : (
        <Wrapper>
          <p className="text-center">{state?.message}</p>
        </Wrapper>
      )}
    </>
  );
};
export default UnsubscribeForm;
