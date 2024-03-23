import './App.css';
import { useState, useEffect } from 'react';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [currentImage, setCurrentImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState([]);

  useEffect(() => {
    // Initially, don't fetch an image automatically
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1&api_key=${ACCESS_KEY}`);
      const data = await response.json();
  
      if (data.length > 0) {
        for (let image of data) {
          const imageAttributes = [
            `Width: ${image.width}`,
            `Height: ${image.height}`,
            `ID: ${image.id}`,
            ...(image.breeds?.length > 0 ? [`Breed: ${image.breeds[0].name}`] : [])
          ];
  
          // Check if any of the image's attributes are in the ban list
          const isBanned = imageAttributes.some(attribute => banList.includes(attribute));
  
          if (!isBanned) {
            setCurrentImage(image);
            setHistory(prevHistory => [...prevHistory, image]);
            return; // Found an image that is not banned, so display it and exit the loop
          }
        }
        // If all images are banned, you may want to handle this case (e.g., show a message)
      }
    } catch (error) {
      console.error("Failed to fetch image from API:", error);
    }
  };  

  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList(prevBanList => [...prevBanList, attribute]);
      // fetchRandomImage();
    }
  };

  const removeFromBanList = (attributeToRemove) => {
    setBanList(banList.filter(attribute => attribute !== attributeToRemove));
  };  

  return (
    <div className="app-container">
      <div className="history-section">
        <h2 className='topic-text'>Who have we seen so far?</h2>
        <div className="history-container">
          {history.map((img, index) => (
            <div key={index}>
              <img src={img.url} alt={`Dog ${index}`} width="100" />
              <p>Image height: {currentImage.width}, width: {currentImage.height} <br />
              with an ID: {currentImage.id}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className='main-container'>
          <h1>Trippin' on Dogs</h1>
          <h2>Discover an image for a dog with sepcific image size and id! 🐾</h2>
          {currentImage && (
            <div>
              <button onClick={() => addToBanList(`Width: ${currentImage.width}`)}>Width: {currentImage.width}</button>
              <button onClick={() => addToBanList(`Height: ${currentImage.height}`)}>Height: {currentImage.height}</button>
              <button onClick={() => addToBanList(`ID: ${currentImage.id}`)}>ID: {currentImage.id}</button>
              <img src={currentImage.url} alt="Random Dog" style={{ maxWidth: '600px', width: '100%' }} />
              {currentImage?.breeds?.length > 0 && (
                <button onClick={() => addToBanList(currentImage.breeds[0].name)}>Ban {currentImage.breeds[0].name}</button>
              )}
            </div>
          )}
          <button onClick={fetchRandomImage}>Discover!</button>
        </div>
      </div>

      <div className="ban-list">
        <h2 className='topic-text'>Ban List</h2>
        <h3>Select an attribute in your listing to ban it</h3>
        {banList.map((item, index) => (
          <button key={index} onClick={() => removeFromBanList(item)}>{item}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
