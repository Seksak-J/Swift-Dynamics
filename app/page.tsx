"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen bg-gradient-to-r from-[#6eda78] to-[#ffa200] flex items-center justify-center">
      <div className="flex flex-row space-x-[40px]">
        <button onClick={() => router.push("/layout")}>
          <div className="w-[300px] h-[100px] bg-white p-[8px] text-start">
            <div className="flex flex-col">
              <div>Test1</div>
              <div className="mt-auto">Layout & style</div>
            </div>
          </div>
        </button>
        <div className="w-[300px] h-[100px] bg-white p-[8px]">Test2</div>
        <button onClick={() => router.push("/form")}>
          <div className="w-[300px] h-[100px] bg-white p-[8px]">
            <p>Test3</p>
            <p className="mt-auto">Form & Table</p>
          </div>
        </button>
      </div>
    </div>
  );
}
