import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import About from "./About";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Funds from "./Funds";
import Home from "./Home";
import Auth from "./Auth";
import ErrorPage from "./ErrorPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Logout from "./Logout";
import Account from "./Account";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/funds" element={<Funds />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
export default App;
