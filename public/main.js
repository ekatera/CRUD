import { renderElements } from "./render.js";
import { getAll, addElement, updateElement, fetchElementByName } from "./app.js";

let elements = [];

// buttons
 const getOne_btn = document.getElementById( 'get-one' );

// inputs
 const nameToRead = document.getElementById( 'name-input' )

 export const errorMessage = document.getElementById( 'error-message' );

document.addEventListener( 'DOMContentLoaded', async () => {
  elements = await getAll();
  console.log(elements);
  renderElements(elements);
});

// find by name
getOne_btn.addEventListener('click', readNameToFetch);

async function readNameToFetch() {
    if ( nameToRead.value.length == 0 ) {
      return;
    }
    
    const foundName = await fetchElementByName( nameToRead.value );
    if ( foundName.length === 0 ) {
      errorMessage.textContent = "Inget namn hittades med namnet: " + nameToRead.value;
      errorMessage.style.display = "block";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 2000);
      return;
    }
    elements = await getAll();
    const element = elements.find( elem => elem.name.toLowerCase() === nameToRead.value.toLowerCase() );
    elements.splice( elements.indexOf( element ), 1 );
    elements.unshift( element );
    renderElements( elements );
    addAnimation( element.id );
  }

// add animation to found element
function addAnimation( elementId ) {
  const foundElement = document.getElementById( elementId );

  foundElement.classList.add( "flash-found" );
  foundElement.style.animation = 'rotate-in 0.5s ease-out, flash-found-bg 2.5s 0.5s ease-in-out';
  setTimeout( () => {
    if ( foundElement ) {
    foundElement.classList.remove( "flash-found" );
    foundElement.style.animation = '';
    }

  }, 3000 );
}

function addFieldsForNewElement() {
  const parentElem = document.getElementById("empty");
  const addLabledText = parentElem.querySelector(".emptyname-label");
  parentElem.removeChild(addLabledText);
  const elemName = document.createElement("h3");
  elemName.textContent = "Nytt namn";
  elemName.classList.add("name", "editable");
  elemName.setAttribute("contenteditable", "true");

  const elemMeaning = document.createElement("p");
  elemMeaning.textContent = "Ny betydelse";
  elemMeaning.classList.add("editable");
  elemMeaning.setAttribute("contenteditable", "true");

  const elemOrigin = document.createElement("p");
  elemOrigin.textContent = "Ny ursprung";
  elemOrigin.classList.add("origin", "editable");
  elemOrigin.setAttribute("contenteditable", "true");

  const elemNameday = document.createElement("p");
  elemNameday.textContent = "Ny namnsdag";
  elemNameday.classList.add("nameday", "editable");
  elemNameday.setAttribute("contenteditable", "true");

  const imgDiv = document.createElement("div");
  imgDiv.classList.add("imgDiv");

  const done = document.createElement("img");

  done.src = "./imgs/done.png";

  done.classList.add("done");


  imgDiv.appendChild(done);


  done.setAttribute( "style", "display: flex" ); 
  done.classList.add( "pulse" );

  parentElem.appendChild(elemName);
  parentElem.appendChild(elemMeaning);
  parentElem.appendChild(elemOrigin);
  parentElem.appendChild(elemNameday);
  parentElem.appendChild(imgDiv);
}

// create new element
export async function create() {
  const parentElem = document.getElementById("empty");
  if (parentElem.querySelector('h3')) {
    return;
  }
  // add fields for new element
  addFieldsForNewElement();
  const doneBtn = parentElem.querySelector(".done");
  doneBtn.addEventListener('click', readFieldsForNewElement);
}

function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n) + "…" : str;
}
  
// save new element
async function readFieldsForNewElement() {
  const parentElem = document.getElementById("empty");
  const fields = parentElem.querySelectorAll(".editable");

  const newElement = {
    name: truncate(fields[0].textContent, 20),
    meaning: truncate(fields[1].textContent, 40),
    origin: truncate(fields[2].textContent, 20),
    nameday: truncate(fields[3].textContent, 20)
  };
  const res = await addElement(newElement);
  elements = await getAll();
  const addedElem = await fetchElementByName( newElement.name );
  if ( addedElem ) {
      elements.splice( elements.indexOf( addedElem[0] ), 1 );
      elements.unshift( addedElem[0] );
      renderElements(elements);
      addAnimation( addedElem[0].id );
  }
}

export async function edit( id ) {
  const parentElem = document.getElementById( id );
  const doneBtn = document.getElementById( "done-" + id );


  // change "done" button style and properties
  doneBtn.setAttribute( "style", "display: flex" ); 
  doneBtn.classList.add( "pulse" );

  const nameField = parentElem.querySelector( "h3" );

  // add event listener to "done" button
  doneBtn.addEventListener( 'click', async () => {
  const fields = parentElem.querySelectorAll( "p" );

  const updatedElement = {
      id: id,
      name: nameField.textContent,
      meaning: truncate(fields[0].textContent, 40),
      origin: truncate(fields[1].textContent, 20),
      nameday: truncate(fields[2].textContent, 20)
    };
    console.log( updatedElement );
    const res = await updateElement( updatedElement );
    for (const field of fields) {
      field.setAttribute( "contenteditable", "false" );
      field.classList.remove( "editable" );
    }
    doneBtn.setAttribute( "style", "display: none" );
  });

  const fields = parentElem.querySelectorAll( "p" );
  fields.forEach(field => field.setAttribute( "contenteditable", "true" ));
  fields.forEach(field => field.classList.add( "editable" ));
}

