export async function getData() {
  const res = await fetch(`${process.env.SERVER_URL}/`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getCollection() {
  const res = await fetch(`${process.env.SERVER_URL}/collection`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getBrand() {
  const res = await fetch(`${process.env.SERVER_URL}/brand`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getStock() {
  const res = await fetch(`${process.env.SERVER_URL}/stock`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}
