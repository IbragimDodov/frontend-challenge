import React, {useEffect, useState} from 'react';

import { Routes, Route } from "react-router-dom";

import './App.css';
import Cats from './components/Cats';
import Favourites from './components/Favourites';
import Header from './components/Header';

function App() {

  const [pictures, setPictures] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);


  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };



  const getPicturesRequest = () => {
    // const urlPic = `https://api.thecatapi.com/v1/images/search?limit=35&page=${currentPage}&order=Desc`;

    // const response = await fetch(urlPic);
    // const responseJson = await response.json();

    fetch(`https://api.thecatapi.com/v1/images/search?limit=15&order=Desc`)
      .then(response => response.json())
      .then(cats => {
        console.log(cats);
        setPictures([...pictures, ...cats]);
        setCurrentPage(prevState => prevState + 1);
        // setTotalCount(cats.headers['content-length']);
      })
      .finally(() => setFetching(false))


  }

  // useEffect( () => {
  //   fetch(`https://api.thecatapi.com/v1/images/search?limit=35&page=${currentPage}&order=Desc`)
  //     .then(response => response.json())
  //     .then(cats => {
  //       setPictures(cats);
  //     });
      
  //   }, [])

  useEffect(() => {
    if (fetching) {
      getPicturesRequest();
    }
  }, [fetching])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-cats-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  };


  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-cats-app-favourites', JSON.stringify(items));
  };

  

  const addFavouritePicture = (favPic) => {
    const newFavouriteList = [...favourites, favPic ];
    setFavourites(newFavouriteList);
    handleFavourite();

    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouritePicture = favPic => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== favPic.id
    );
    handleFavourite();

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }


  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Cats isFavourite={isFavourite} handleFavourite={handleFavourite} pictures={pictures} setPictures={setPictures} addFavouritePicture={addFavouritePicture} />} />
        <Route path="/favourites" element={<Favourites isFavourite={isFavourite} handleFavourite={handleFavourite} removeFavouritePicture={removeFavouritePicture} favourites={favourites} setFavourites={setFavourites} />} />
      </Routes>
    </>
  );
}

export default App;
