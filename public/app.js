const BASE_URL = 'http://localhost:3000/names';

// fetch all
async function getAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}

// fetch by name
async function fetchElementById( name ) {
  const res = await fetch( `${BASE_URL}?name=${name}` );
  const data = await res.json();
  console.log( data )
  return data;
}

// delete by name
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

// add new name
async function addElement( element ) {
  const data = await fetchElementById( element.name );
  if ( data.length > 0 ) {
    console.log( "Element with this name already exists" );
    return;
  }

  const elems = await getAll();
  const maxId = Math.max( ...elems.map( elem => elem.id ) );
  element.id = maxId + 1;

  // request
  const res = await fetch( `${BASE_URL}`, { 
    method: 'POST',

    body: JSON.stringify( element ),

    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log( res );

  return data;
}

// update
async function updateElement( element ) {
  const data = await fetchElementById( element.name );
  console.log( data );
  if ( data.length === 0 ) {
    console.log( "Element with this name does not exist" );
    return;
  }

  if ( element.meaning.length > 0 ) {
    data[0].meaning = element.meaning;
  }
  if ( element.origin.length > 0 ) {
    data[0].origin = element.origin;
  }
  if ( element.nameday.length > 0 ) {
    data[0].nameday = element.nameday;
  }

  // request
  const res = await fetch( `${BASE_URL}/${data[0].id}`, { 
    method: 'PUT',

    body: JSON.stringify( element ),

    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log( res );

  return data;
}