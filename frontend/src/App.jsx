import { useState, useEffect } from "react";

export default function App(){

  const [items,setItems] = useState([]);

  async function load() {
    const res = await fetch("http://localhost:5000/items")
    const data = await res.json()
    setItems(data)
  }


  async function addItem() {
    await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Item " + Date.now() })
    });
    await load();
  }

  useEffect(() => {
    load();
  }, []);


  return (
    <div>
      <h1>Items</h1>
      <button onClick={addItem}>Add Item</button>

      {items.map(i => (
        <p key={i._id}>{i.name}</p>
      ))}
    </div>
  );
}
