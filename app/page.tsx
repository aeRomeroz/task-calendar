"use client";
import DemoWrapper from "@/components/DemoWrapper";
import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
};

function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://test.miocafehn.com/api/get-data.php");
        const data = await res.json();

        if (data.status === "success") {
          setItems(data.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);


  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Items desde Freehostia</h1>
        <ul>
          {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      </div>
      <DemoWrapper />
    </main>
  );
}

export default Home;
