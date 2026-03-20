import { renderElements } from "./render.js";

const BASE_URL = 'http://localhost:3000/names';

// fetch all
export async function getAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}

// fetch by name
export async function fetchElementByName( name ) {
  const res = await fetch( `${BASE_URL}?name=${name}` );
  const data = await res.json();
  return data;
}


// fetch by id
async function fetchElementById( id ) {
  const res = await fetch( `${BASE_URL}/${id}` );
  const data = await res.json();
  return data;
}

// delete by name
export async function deleteElementById( id ) {
  const data = await fetchElementById( id );

  const res = await fetch( `${BASE_URL}/${parseInt( id, 10 )}`, { 
    method: 'DELETE',
    headers: {
    'Content-type': 'application/json'
  }
  });

  const elements = await getAll();
  renderElements(elements);

  return res;
}

// add new name
export async function addElement( element ) {
  const data = await fetchElementByName( element.name );
  if ( data.length > 0 ) {
    console.log( "Element with this name already exists" );
    return;
  }

  const elems = await getAll();
  const maxId = Math.max( ...elems.map( elem => parseInt(elem.id, 10) ) );
  element.id = (maxId + 1).toString();

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
export async function updateElement( element ) {

  if ( element.meaning.length === 0 ) {
   return;
  }
  if ( element.origin.length === 0 ) {
    return;
  }
  if ( element.nameday.length === 0 ) {
    return;
  }

  // request
  const res = await fetch( `${BASE_URL}/${element.id}`, { 
    method: 'PUT',

    body: JSON.stringify( element ),

    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log( res );

  return res;
}