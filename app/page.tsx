"use client";
import DemoWrapper from "@/components/DemoWrapper";
import { useEffect, useState } from "react";
import { getItems } from "@/lib/api";

type Item = {
  id: number;
  name: string;
};

function Home() {
  
  const items = getItems();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
         <h1 className="text-2xl font-bold">Items</h1>
            <pre>{JSON.stringify(items.data, null, 2)}</pre>
      </div>
      <DemoWrapper />
    </main>
  );
}

export default Home;
