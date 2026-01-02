import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../Homepage.tsx'
import SignIn from '../SignIn.tsx'
import SignUp from '../SignUp.tsx'
import CreateProduct from '../CreateProduct.tsx'
import Profile from '../Profile.tsx'
import DeleteProduct from '../DeleteProduct.tsx'
import EditProduct from '../EditProduct.tsx'
import BuyProduct from '../BuyProduct.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
          <Route path="/edit-product" element={<EditProduct />} />
          <Route path="/buy-product" element={<BuyProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
