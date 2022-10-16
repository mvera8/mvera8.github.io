export const getGifs = async( category ) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=QQFEnlxp0Y5XyyqM1h1akHTk0RiuvJ2H&q=${ category }&limit=20`;
  const resp = await fetch(url);
  const { data } = await resp.json();

  const gifs = data.map( img => ({
      id: img.id,
      title: img.title,
      url: img.images.downsized_medium.url
    })
  );

  return gifs;
}