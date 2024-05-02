import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen flex items-center justify-center p-5">
      <div className="bg-white max-w-full shadow-lg p-5 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1">
              In transit
            </span>
            <span className="text-4xl font-semibold">Cool blue</span>
          </div>
          <div className="size-12 bg-orange-400 rounded-full"></div>
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="bg-green-400 text-white uppercase px-2.5 py-1.5 text-xs font-medium rounded-full">
            Today
          </span>
          <span>9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 animate-pulse bg-gray-200 rounded-full absolute"></div>
          <div className="w-2/3 h-2 animate-pulse bg-green-400 rounded-full absolute"></div>
        </div>
        <div className="flex justify-between items-center mt-5 text-gray-600 gap-2">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400">Delivered</span>
        </div>
      </div>
    </main>
  );
}
