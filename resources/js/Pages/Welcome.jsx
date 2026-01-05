import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <main className="bg-white">
      <Link
        className="
    inline-block
    px-4 py-2
    bg-red-500 text-white rounded-lg
    transition-all duration-300 ease-in-out
    hover:bg-red-700 hover:translate-y-24
  "
        href={route("login")}>
        Login
      </Link>

      <Link href={route("register")}>register</Link>
    </main>
  );
}
