import {
  ArrowBendDownRight,
  ArrowBendUpRight,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
export default function InfoComponent() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-12">
      <div className="flex flex-row justify-between w-full mt-8">
        <p className="text-purple-600 -rotate-12 text-xl">
          Insert some cool animations
        </p>
        <p className="text-theme-text font-semibold text-6xl animate-bounce transition-colors duration-300">
          Fair.fun
        </p>
        <p className="text-purple-600 rotate-45 text-2xl">
          Best animation here
        </p>
      </div>
      <div className="w-8/12 bg-theme-bg bg-opacity-90 flex flex-row justify-center items-center mx-auto gap-12 p-4 border rounded-2xl shadow-lg transition-colors duration-300">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ArrowBendUpRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
            <ArrowBendDownRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-theme-text transition-colors duration-300">
              launch
            </p>
            <p className="text-xl text-theme-text transition-colors duration-300">
              buy
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          {" "}
          <div className="flex flex-col">
            <ArrowBendUpRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
            <ArrowBendDownRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-theme-text transition-colors duration-300">
              coins
            </p>
            <p className="text-xl text-theme-text transition-colors duration-300">
              meme coins (fun)
            </p>
          </div>
        </div>
        <p className="text-xl text-theme-text transition-colors duration-300">
          in a
        </p>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ArrowBendUpRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
            <ArrowBendDownRight
              className="text-purple-600"
              weight="thin"
              size={32}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl text-theme-text transition-colors duration-300">
              fair
            </p>
            <p className="text-xl text-theme-text transition-colors duration-300">
              unique
            </p>
          </div>
        </div>
        <p className="text-xl text-theme-text transition-colors duration-300">
          way
        </p>
      </div>
      <div className="mt-4">
        <p className="text-4xl text-theme-text transition-colors duration-300">
          we got you (for real),{" "}
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold transition-colors  underline hover:underline decoration-pink-500/30 hover:decoration-pink-500 cursor-pointer">
              how?
            </span>
          </Link>{" "}
          💯
        </p>
      </div>
      <div>
        <p className="text-4xl text-theme-text transition-colors duration-300">
          some examples of fraud and exploits 🫣,{" "}
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold transition-colors underline hover:underline decoration-indigo-500/30 hover:decoration-indigo-500 cursor-pointer">
              really?
            </span>
          </Link>{" "}
        </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-4xl text-theme-text transition-colors duration-300">
          well, if you&apos;re ready
        </p>
        <Link href={"/create"}>
          {" "}
          <span className="text-4xl text-theme-text transition-colors underline hover:underline hover:decoration-sky-700 decoration-sky-500/30 font-semibold">
            👉 create your "Fair" $coin 👈
          </span>{" "}
        </Link>
      </div>
    </div>
  );
}
