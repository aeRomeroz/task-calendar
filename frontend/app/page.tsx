"use client";
import DemoWrapper from "@/components/DemoWrapper";
import { useEffect, useState } from "react";
type Item = {
  id: number;
  name: string;
};

async function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center">
      <DemoWrapper />
    </main>
  );
}

export default Home;
