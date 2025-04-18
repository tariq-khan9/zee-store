export async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getCollection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/collection`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getBrand() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/brand`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getStock() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stock`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

export async function getTestimonial() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/testimonial`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}
