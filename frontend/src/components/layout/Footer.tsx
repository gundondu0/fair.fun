import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-row justify-between items-center w-10/12 mx-auto p-4 border rounded-2xl my-2">
      <Link href={""}>
      <p>whitepaper</p>
      </Link>
      <Link href={""}>
      <p>how it works</p>
      </Link>
    </div>
  );
}
