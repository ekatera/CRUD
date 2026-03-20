import { renderElements } from "./render.js";
import { errorMessage } from "./main.js";
const BASE_URL = 'http://localhost:3000/names';

// fetch all
export async function getAll() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data;
}

// fetch by name
export async function fetchElementByName( name ) {
  try {
    const res = await fetch( `${BASE_URL}?name=${encodeURIComponent(name)}` );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching element by name:", error);
    errorMessage.textContent = "Ett fel inträffade vid hämtning av namnet: " + name;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);

    return [];
  }    
}


// fetch by id
async function fetchElementById( id ) {
  try {
  const res = await fetch( `${BASE_URL}/${id}` );
  const data = await res.json();
  return data;
  } catch (error) {
    console.error("Error fetching element by id:", error);
    errorMessage.textContent = "Ett fel inträffade vid hämtning av namnet med id: " + id;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);
    return null;
  }
}

// delete by name
export async function deleteElementById( id ) {
  try {
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
  } catch (error) {
    console.error("Error deleting element by id:", error);
    errorMessage.textContent = "Ett fel inträffade vid borttagning av namnet med id: " + id;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);
    return null;
  }

}

// add new name
export async function addElement( element ) {
  try {
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
  } catch (error) {
    console.error("Error adding element:", error);
    errorMessage.textContent = "Ett fel inträffade vid tillägg av namnet: " + element.name;
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 2000);
    return null;
  }

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
  try {
  const res = await fetch( `${BASE_URL}/${element.id}`, { 
    method: 'PUT',

    body: JSON.stringify( element ),

    headers: {
      'Content-type': 'application/json'
    }
  });
  console.log( res );

  return res;
} catch (error) {
  console.error("Error updating element:", error);
  errorMessage.textContent = "Ett fel inträffade vid uppdatering av namnet: " + element.name;
  errorMessage.style.display = "block"; 
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 2000);
  return null;
 }
}