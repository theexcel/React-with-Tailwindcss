import React, {useState, useEffect} from "react"
import Hero, {Props} from "./Components/Hero"
import ImageSearch from "./Components/ImageSearch"



const App: React.FC<Props> = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}&q=yellow+flowers&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text:any) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image: any) => (
            <Hero key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};


export default App;
