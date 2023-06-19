
import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Productos from "./components/Productos"
import ProductoNuevo from "./components/ProductoNuevo"
import ProductoEditar from "./components/ProductoEditar"


//REDUX
import { Provider } from "react-redux"
import store from "./store"

function App() {

  return (
    <>
      <BrowserRouter>
      <Provider store={store}>
       <Header/>
       <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<Productos/>}/>
          <Route exact path="/productos/nuevo" element={<ProductoNuevo/>}/>
          <Route exact path="/productos/editar/:id" element={<ProductoEditar/>}/>
        </Routes>
       </div>
       </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
