import Link from "next/link";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <nav className="flex justify-end items-center w-screen h-16 border-b-2 border-red-400">
      <Link className="mr-6" href="/">
        Home
      </Link>
    </nav>
  );
}
