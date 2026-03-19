const BASE_URL = 'http://localhost:3000/names';

async function getAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}


async function fetchElementById( name ) {
  const res = await fetch( `${BASE_URL}?name=${name}` );
  const data = await res.json();
  console.log( data )
  return data;
}

async function deleteElementById( name ) {
  const data = await fetchElementById( name );

  for (const elem of data) {
    const res = await fetch( `${BASE_URL}/${elem.id}`, { 
      method: 'DELETE',
      headers: {
      'Content-type': 'application/json'
    }
    });
    //const data = await res.json();
    console.log( res );
  }


  return data;
}

