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

    elems.forEach(elem => {
        const elemDiv = document.createElement( "div" );
        elemDiv.classList.add("elemBox");
        elemDiv.id = elem.id;
        

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
        elemNameday.textContent = 'Namndag: ' + elem.nameday;
        elemNameday.classList.add( "nameday" );
        main.appendChild( elemDiv );
        elemDiv.appendChild( elemName );
        elemDiv.appendChild( elemMeaning );
        elemDiv.appendChild( elemOrigin );
        elemDiv.appendChild( elemNameday );

    });
}
