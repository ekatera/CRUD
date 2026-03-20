import { deleteElementById } from "./app.js";
import { edit, create } from "./main.js";
const originMap = {
  "Nordiskt": "nordic",
  "Hebreiskt": "hebraic",
  "Grekiskt": "greek",
  "Germanskt": "germanic",
  "Latinskt": "latin",
  "Keltiskt": "celtic",
  "Arameiskt": "aramaic"
};


const main = document.querySelector( "main" );

export function renderElements( elems = [] ) {
    main.replaceChildren();    

    // add empty div for "add new name"
    const emptyDiv = document.createElement( "div" );
    const emptyNameDiv = document.createElement( "p" );
    emptyDiv.classList.add("emptyname");
    emptyNameDiv.classList.add("emptyname-label");
    emptyDiv.id = "empty";
    emptyDiv.classList.add("rotate-in");
    emptyNameDiv.textContent = "Lägg till namn";
    emptyDiv.addEventListener( 'click', () => create(  ) );

    main.appendChild( emptyDiv );
    emptyDiv.appendChild( emptyNameDiv );

    elems.forEach(elem => {
        const elemDiv = document.createElement( "div" );
        elemDiv.classList.add("elemBox");
        elemDiv.id = elem.id;
        elemDiv.classList.add("rotate-in");
        

        const elemName = document.createElement( "h3" );
        elemName.textContent = elem.name;
        elemName.classList.add( "name" );

        const elemMeaning= document.createElement( "p");
        elemMeaning.textContent = elem.meaning;

        const elemOrigin = document.createElement( "p");
        elemOrigin.textContent =  elem.origin;
        elemOrigin.classList.add(originMap[elem.origin] || "default-origin");
        elemOrigin.classList.add( "origin" );
        
        const elemNameday = document.createElement( "p");
        elemNameday.textContent = elem.nameday;
        elemNameday.classList.add( "nameday" );

        const imgDiv = document.createElement( "div" );
        imgDiv.classList.add( "imgDiv" );
        const pen = document.createElement( "img" );
        const trash = document.createElement( "img" );
        const done = document.createElement( "img" );
        done.id = "done-" + elem.id;

        pen.src = "./imgs/pencil.png";
        trash.src = "./imgs/bin.png";
        done.src = "./imgs/done.png";

               
        pen.classList.add( "pen" );
        trash.classList.add( "bin" );
        done.classList.add( "done" );

        trash.addEventListener('click', () => deleteElementById ( elem.id ) );
        pen.addEventListener('click', (e) => edit( e.target.parentNode.parentNode.id ) );


        main.appendChild( elemDiv );
        elemDiv.appendChild( elemName );
        elemDiv.appendChild( elemMeaning );
        elemDiv.appendChild( elemOrigin );
        elemDiv.appendChild( elemNameday );
        elemDiv.appendChild( imgDiv );

        imgDiv.appendChild( done );
        imgDiv.appendChild( pen );
        imgDiv.appendChild( trash );
        
    });
}

