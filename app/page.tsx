import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-lg shadow-lg p-5 rounded-2xl flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full bg-gray-200 h-12 pl-5 outline-none placeholder:text-red-500"
        />
        <button className="bg-black text-white py-2 rounded-full active:scale-90 transition-transform font-medium">
          Search
        </button>
      </div>
    </main>
  );
}
