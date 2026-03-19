const BASE_URL = 'http://localhost:3000/names';

async function getAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}


