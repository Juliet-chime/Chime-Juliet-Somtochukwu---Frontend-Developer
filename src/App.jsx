//import { useEffect, useState } from 'react'
import './App.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCapsule, getCapsuleSelector } from './services/slice/capsule/allCapsule';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
// import Header from './assets/component/Header';
import Footer from './assets/component/Footer';
import { routes } from './routes';
import Header from './assets/component/Header';

function App() {
  // const dispatch = useDispatch();

  // const capsule = useSelector(getCapsuleSelector)

  // console.log(capsule,'capsule')

  // useEffect(()=>{
  //   dispatch(fetchCapsule())
  // },[dispatch])

  return (
    <div className='container'>
    {/* <Header/> */}
    <BrowserRouter>
    <Header/>
      <Routes>
        {routes.map((items,idx)=>{
          const {path,component} = items

          let Component = component

          return <Route
          path={path}
          element={<Component/>}
          key={idx}
          />
        })}
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
