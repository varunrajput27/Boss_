import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import NewsLetterBox from '../components/NewsLetterBox'
import CategoryPage from '../components/CategoryPage'
import { useEffect } from 'react'
const Home = () => {
   useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <CategoryPage/>
      <NewsLetterBox />
    </div>
  )
}

export default Home
