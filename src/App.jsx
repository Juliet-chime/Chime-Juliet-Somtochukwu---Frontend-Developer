import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Footer from './assets/component/Footer';
import { routes } from './routes';
import Header from './assets/component/Header';

function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((items, idx) => {
            const { path, component } = items

            let Component = component

            return <Route
              path={path}
              element={<Component />}
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
