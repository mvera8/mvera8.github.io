
const apiKey      = 'QQFEnlxp0Y5XyyqM1h1akHTk0RiuvJ2H';
const inputSearch = document.getElementById( 'inputSearch' );
const btnSearch   = document.getElementById( 'btnSearch' );
const divResult   = document.getElementById( 'divResult' );

const changeBytes = ( bytes ) => {
  // let k_bytes = parseInt( Math.floor( Math.log( bytes ) / Math.log( 1024 ) ) );
  let k_bytes = parseInt( bytes / 1024 );
  return k_bytes + ' kB';
}

const getSearchPeticion = async ( search ) => {
  try {
    divResult.innerHTML = '';
    const resp     = await fetch( `https://api.giphy.com/v1/gifs/search?api_key=${ apiKey }&q=${ search }&limit=18` );
    const { data } = await resp.json();
    data.forEach( element => {
      console.log( element );
      let imageUrl  = element.images.preview_gif.url;
      let imageSize = element.images.original.size;
      let col       = document.createElement( 'div' );
      let img       = document.createElement( 'img' );
      let p         = document.createElement( 'p' );
      
      img.src       = imageUrl;
      img.className = 'img-fluid w-100';
      p.className   = 'text-center small';
      p.textContent += changeBytes( imageSize );
      col.className = 'col-2';
      col.append( img );
      col.append( p )
      divResult.append( col );
    });
  } catch ( error ) {
    console.error( error );
  }
}

btnSearch.addEventListener( 'click', event => {
  let searchValue = inputSearch.value;
  getSearchPeticion( searchValue );
});
