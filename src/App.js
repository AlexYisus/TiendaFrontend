import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from "./containers/Home";
import Error404 from "./containers/errors/Error404";

import Signup from "./containers/auth/Signup";
import Login from "./containers/auth/Login";
import Activate from "./containers/auth/Activate";
import ResetPassword from "./containers/auth/ResetPassword";
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';

import Shop from "./containers/Shop";
import ProductDetail from "./containers/pages/productDetail";
import Search from './containers/pages/Search';
import Cart from './containers/pages/Cart';
import Checkout from './containers/pages/Checkout';
import ThankYou from './containers/pages/ThankYou';
import Dashboard from './containers/pages/Dashboard';
import DashboardPayments from './containers/pages/DashboardPayments';
import { Toaster } from "sonner";
import { useEffect } from "react";
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', () => { })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  })
  return (
    <Provider store={store}>
      <Toaster position="top-center" closeButton richColors />
      <Router>
        <Routes>
          {/*Error Display*/}
          <Route path="*" element={<Error404 />} />

          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/checkout' element={<Checkout />} />

          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/activate/:uid/:token" element={<Activate />} />
          <Route exact path='/reset_password' element={<ResetPassword />} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ProductDetail />} />

          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path='/search' element={<Search />} />

          <Route exact path='/thankyou' element={<ThankYou />} />

          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/dashboard/payments' element={<DashboardPayments />} />


        </Routes>
      </Router>
    </Provider>
  );
}

export default App;