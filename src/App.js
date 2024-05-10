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
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}
export default App;
