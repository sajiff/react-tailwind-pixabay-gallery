import React, { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setimages] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [term, setterm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setimages(data.hits);
        setisloading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setterm(text)} />
      {!isloading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>
      )}
      {isloading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
