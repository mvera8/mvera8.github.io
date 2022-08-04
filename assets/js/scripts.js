
const apiKey      = 'QQFEnlxp0Y5XyyqM1h1akHTk0RiuvJ2H';
const inputSearch = document.getElementById( 'inputSearch' );
const btnSearch   = document.getElementById( 'btnSearch' );
const divResult   = document.getElementById( 'divResult' );
const divTrending = document.getElementById( 'divTrending' );
const divToast = document.getElementById( 'divToast' );


// DOM ready.
document.addEventListener( 'DOMContentLoaded', function(event) {
  loadTrendings()
});

// Copy to Clipboard.
const copytoClipboard = ( url ) => {
  let input = document.createElement('input');
  input.value = url;
  input.id = 'inputID';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);

  divToast.classList.add( 'show' );
  setTimeout(() => {
    divToast.classList.remove( 'show' );
  }, 1000);
}

// Add Trending buttons.
const loadTrendings = () => {
  const span       = document.createElement( 'span' );
  span.className   = 'small';
  span.textContent = 'Trending: ';
  divTrending.append( span );

  const trending   = [
   'The Office',
   'Uruguay',
   'Ricardo Fort',
   'Julio Iglesias',
   'Simpsons'
  ];

  trending.forEach( trend => {
    let button         = document.createElement( 'button' );
    button.type        = 'button';
    button.className   = 'btn btn-primary btn-sm me-1';
    button.textContent = trend;
    button.onclick     = function() {
      getSearchPeticion( trend );
    };

    divTrending.append( button );
  });
}

// Convert bytes to kBs.
const changeBytes = ( bytes ) => {
  // let k_bytes = parseInt( Math.floor( Math.log( bytes ) / Math.log( 1024 ) ) );
  let k_bytes = parseInt( bytes / 1024 );
  return k_bytes + ' kB';
}

// Make request.
const getSearchPeticion = async ( search ) => {
  try {
    divResult.innerHTML = '';
    const resp     = await fetch( `https://api.giphy.com/v1/gifs/search?api_key=${ apiKey }&q=${ search }&limit=18` );
    const { data } = await resp.json();
    data.forEach( element => {
      console.log( element );
      let imageUrlsM = element.images.preview_gif.url;
      let imageUrllG = element.images.original.url;
      let imageSize  = element.images.original.size;
      let col        = document.createElement( 'div' );
      let button     = document.createElement( 'button' );
      let img        = document.createElement( 'img' );
      let p          = document.createElement( 'p' );
      
      col.className = 'col-2';
      img.src       = imageUrlsM;
      img.className = 'img-fluid w-100';
      p.className   = 'text-center small';
      p.textContent += changeBytes( imageSize );
      button.className   = 'p-0 border-0 w-100';
      button.value       = imageUrllG;
      button.onclick     = function() {
        copytoClipboard( imageUrllG );
      };

      button.append( img );
      col.append( button );
      col.append( p );
      divResult.append( col );
    });
  } catch ( error ) {
    console.error( error );
  }
}

// Click to make request (getSearchPeticion()).
btnSearch.addEventListener( 'click', event => {
  let searchValue = inputSearch.value;
  getSearchPeticion( searchValue );
});
