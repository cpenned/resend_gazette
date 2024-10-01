import Image from "next/image";
import Form from "./components/Form";
import bgImg from "@/assets/bg-image.jpg";

export default function Home() {
  return (
    <div className="~p-4/8 font-[family-name:var(--font-geist-sans)] relative overflow-hidden grid place-items-center min-h-screen">
      {/* <div className="absolute w-[60%] h-[35vmax] left-1/2 bg-muted/20 blur-3xl rounded-full -top-1/2 md:-top-1/2 -translate-x-1/2"></div>
      <div className="absolute w-[60%] h-[35vmax] left-1/2 bg-muted/20 blur-3xl rounded-full -bottom-1/4 md:-bottom-1/2 -translate-x-1/2"></div> */}
      <Image
        alt=""
        className="absolute inset-0 pointer-events-none w-full h-full opacity-50 blur-xl -z-10"
        src={bgImg}
      />
      {/* newspaper */}
      <Form />
      {/* tech stack */}
    </div>
  );
}
