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

}
