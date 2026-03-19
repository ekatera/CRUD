import { renderElements } from "./render.js";

let elements = [];
// buttons
 const getAll_btn = document.getElementById( 'get-all' );
 const getOne_btn = document.getElementById( 'get-one' );
 const add_btn = document.getElementById( 'add' );
 const update_btn = document.getElementById( 'update' );


// inputs
 const nameToRead = document.getElementById( 'name-input' )
 const delete_btn = document.getElementById( 'delete' );
 const nameToDelete = document.getElementById( 'delete-input' )
 const nameInput = document.getElementById( 'add-name-input' );
 const meaningInput = document.getElementById( 'add-meaning-input' );
 const originInput = document.getElementById( 'add-origin-input' );
 const namedayInput = document.getElementById( 'add-nameday-input' );
 const updateNameInput = document.getElementById( 'update-name-input' );
 const updateMeaningInput = document.getElementById( 'update-meaning-input' );
 const updateOriginInput = document.getElementById( 'update-origin-input' );
 const updateNamedayInput = document.getElementById( 'update-nameday-input' );

 // show all
getAll_btn.addEventListener('click', async () => {
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

    const data = await fetchElementById( nameToRead.value );
    renderElements( data );
    console.log( data );
}

// delete by name
delete_btn.addEventListener('click', readNameToDelete);

async function readNameToDelete() {
    if ( nameToDelete.value.length == 0 ) {
      return;
    }

    const res = await deleteElementById( nameToDelete.value );
    console.log( res );
}

// add new element
add_btn.addEventListener('click', add);
async function add() {
if ( nameInput.value.length == 0 || meaningInput.value.length == 0 ) {
    return;
  }
  const newName = {
    name: nameInput.value,
    meaning: meaningInput.value,
    origin: originInput.value  || "",
    nameday: namedayInput.value || ""
  };
  const res = await addElement( newName );
  console.log( res );
}

// update element
update_btn.addEventListener('click', update);

async function update() {
  if ( updateNameInput.value.length == 0 ) {
    return;
  }
  const updatedName = {
    name: updateNameInput.value,
    meaning: updateMeaningInput.value,
    origin: updateOriginInput.value  || "",
    nameday: updateNamedayInput.value || ""
  };
  console.log( updatedName );
  const res = await updateElement( updatedName );
  console.log( res );

}