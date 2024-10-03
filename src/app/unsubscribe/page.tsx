import { Suspense } from "react";
import UnsubscribeForm from "../components/UnsubscribeForm";

export default function Home() {
  return (
    <Suspense>
      <UnsubscribeForm />
    </Suspense>
  );
}
