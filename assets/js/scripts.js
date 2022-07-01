const apiKey         = 'QQFEnlxp0Y5XyyqM1h1akHTk0RiuvJ2H';
const randomPeticion = fetch( `https://api.giphy.com/v1/gifs/random?api_key=${ apiKey }` );
let searchQuery      = document.getElementById( 'searchQuery' );
const result = document.getElementById( 'searchResult' );

console.log( 'small' );

getSearchPeticion( 'hello', 'small' );

/*
randomPeticion
  .then( resp => resp.json() )
  .then( ({ data }) => {
      const { url } = data.images.original;
      const img = document.createElement( 'img' );
      img.src  = url;
      document.body.append( img );
  })
  .catch( console.warn );
  */

function clickSearch () {
  let search = searchQuery.value;
  if( !! search ) {
    console.log( 'click' );
    console.log( search );
    getSearchPeticion( search );
  }
}

function getSearchPeticion ( search, type ) {
  const searchPeticion = fetch( `https://api.giphy.com/v1/gifs/search?api_key=${ apiKey }&q=${ search }&limit=6` );
    searchPeticion
    .then( resp => resp.json() )
    .then( ({ data }) => {
        data.forEach( element => {
          console.log( element );
          let imageUrl;
          if ( 'small' === type ) {
            imageUrl = element.images.downsized.url;
          } else {
            imageUrl = element.images.original.url;
          }
          // console.log( imageUrl );
          let col = document.createElement( 'div' );
          col.className = 'col';
          let img = document.createElement( 'img' );
          img.src  = imageUrl;
          img.className = 'img-fluid';
          img.className = 'w-100';
          col.append( img );
          result.append( col );
        });
    })
    .catch( console.warn );
}
