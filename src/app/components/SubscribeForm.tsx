"use client";
// library imports
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Confetti from "react-dom-confetti";

// form actions
import { cancelEmail } from "@/actions/cancelEmail";
import { sendEmail } from "@/actions/sendEmail";

// components
import Checkbox from "@ui/Checkbox";
import Button from "@ui/FormButton";
import TextInput from "@ui/TextInput";
import Wrapper from "@ui/Wrapper";

const textInputs = [
  {
    autoFocus: true,
    name: "name",
    type: "text",
    autoComplete: "name",
    placeholder: "Enter your name",
  },
  {
    name: "email",
    type: "email",
    autoComplete: "email",
    placeholder: "Enter your email address",
  },
];

const SubscribeForm = () => {
  const [showForm, setShowForm] = useState(true);
  const [count, setCount] = useState(60);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, submitSendEmail] = useFormState(sendEmail, {
    message: "",
    success: false,
    cancelEmail: null,
    errors: {},
  });
  const [cancelState, submitCancelEmail] = useFormState(cancelEmail, {
    message: "Thank you for subscribing!",
    success: false,
  });

  useEffect(() => {
    if (submitState?.errors) {
      setErrors(submitState.errors);
    }

    if (submitState?.success) {
      setShowForm(false);
    }
  }, [submitState]);

  useEffect(() => {
    if (cancelState?.success) {
      setCount(0);
    }
  }, [cancelState]);

  // count downs every second only after the form shows
  useEffect(() => {
    if (!showForm && submitState?.cancelEmail) {
      const timer = setInterval(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      if (count === 0) {
        clearInterval(timer);
      }
      return () => clearInterval(timer);
    }
  }, [showForm, count, submitState]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!errors[event.target.name]) {
      return;
    }
    setErrors((prev) => ({ ...prev, [event.target.name]: "" }));
  };

  return (
    <>
      {showForm ? (
        <form className="grid gap-4 w-full max-w-sm" action={submitSendEmail}>
          <div className="text-center">
            <h1 className="text-3xl font-bold">The Resend Gazette</h1>
            <p className="text-pretty">
              Subscribe to our newsletter for the latest updates and news for
              all things Resend.
            </p>
          </div>
          <Wrapper>
            {textInputs.map((input) => (
              <TextInput
                {...input}
                key={input.name}
                name={input.name}
                onInput={handleInput}
                errorMessage={errors[input.name]}
                required
              />
            ))}
          </Wrapper>
          <Wrapper>
            <Checkbox name="attachment" label="Send me Resend’s philosophy" />
          </Wrapper>
          <Wrapper>
            <Button text="Subscribe" pendingText="Subscribing..." />
          </Wrapper>
          <p className="sr-only" aria-live="polite" role="status">
            {submitState?.message}
          </p>
        </form>
      ) : (
        <Wrapper className="shadow-2xl shadow-secondary/20">
          <div className="grid gap-6 items-center text-center">
            <div>
              <p className="text-2xl font-bold text-secondary">
                {cancelState?.message}
              </p>
              {submitState?.cancelEmail && count > 0 && (
                <p>
                  You can still cancel for {count} second{count > 1 ? "s" : ""}
                </p>
              )}
            </div>
            {submitState?.cancelEmail && count > 0 && (
              <form action={submitCancelEmail}>
                <input
                  type="text"
                  hidden
                  name="email"
                  value={submitState?.cancelEmail}
                  readOnly
                />
                <input
                  type="text"
                  hidden
                  name="emailId"
                  value={submitState?.message}
                  readOnly
                />
                <Button
                  variant="danger"
                  text="Cancel Subscription"
                  pendingText="Canceling..."
                />
              </form>
            )}
          </div>
        </Wrapper>
      )}
      <div className="absolute -z-10">
        <Confetti
          active={submitState.success}
          config={{
            startVelocity: 80,
            duration: 15000,
            dragFriction: 0.12,
            spread: 160,
            elementCount: 800,
            colors: [
              "#0E0128",
              "#DDDFEC",
              "#FEB429",
              "#2EFEC0",
              "#1A014C",
              "#214C4B",
            ],
          }}
        />
      </div>
    </>
  );
};
export default SubscribeForm;
