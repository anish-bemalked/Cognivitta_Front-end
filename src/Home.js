import { Button } from "antd";
import axios from "axios";
import "./Login.css";
import { checkAuth } from "./ProtectedRoutes";
import { useEffect, useState } from "react";

function Home() {
  const login = async () => {
    const res = await axios.get("http://localhost:8080/v1/login");

    if (res.status === 200) {
      window.location.assign(res.data.url);
    }
  };

  const [name, setName] = useState("");
  const fetchName = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/user/profile",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    setName(response.data.data.user_name);
  };

  useEffect(() => {
    if (checkAuth()) {
      fetchName();
    }
  }, []);

  if (checkAuth()) {
    return (<div className="main-container">
      <div className="sub-container-1">
        <div className="sub-container-2">
          <div className="sub-container-3">
            <div>
              <p><h2 >Trust with confidence</h2></p>
              <br></br>
              
              <div className="description">
                <p>
                  <h3>No spam or gimmicks</h3>
                  That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
                  <br></br>
                  <br></br>
                  <h3>Customer-first always</h3>
                  That's why 1.5+ crore customers trust Zerodha with ₹4.5+ lakh crores of equity investments and contribute to 15% of daily retail exchange volumes in India.
                  <br></br>
                  <br></br>

                  <h3>The Zerodha universe</h3>
                  Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-container-4">
          
            <div className="pic">
            <div class="pic1"></div>

            </div>

          
        </div>
        
      </div>
      <div className="sub-container-2">
        <h2>Everything you need</h2>
        <div className="sub-container-4">
          <div className="pic4"></div>
        </div>
        <div className="sub-container-4">
          <h2>Invest in everything
          </h2>
          <br></br>
          <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
          </p>
        </div>



      </div>
      
    </div>
    
    );
  }

  return (
<div className="main-container">
      <div className="sub-container-1">
        <div className="sub-container-2">
          <div className="sub-container-3">
            <div>
              <p>Welcome to</p>
              <div className="brand-name">COGNIVITTA</div>
              <div className="description">
                <p>
                  <h3>Manage your Portfolio better with Cognivitta</h3>
                  Online platform to tailor, organize, and personalize your
                  Portfolio
                  <br></br>
                  <h3>Categorize your Portfolio</h3>
                  Divide your portfolio into distinct segments by risk, sector,
                  or investment style.
                  <br></br>
                  <h3>Unified platform</h3>
                  Consolidation of holdings across various Demat accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sub-container-4">
          <div className="sub-container-5">
            <div className="login-buttons">
              <div>
                <p className="login-text">Login with your Broker</p>
              </div>
              <div className="button-grid">
                <Button className="button" type="primary" onClick={login}>
                  <div className="button-content">
                    <div>Upstox</div>
                  </div>
                </Button>
                <Button className="button" type="primary">
                  <div className="button-content">
                    <div>Zerodha</div>
                  </div>
                </Button>
                <Button className="button" type="primary">
                  <div className="button-content">
                    <div>Angel One</div>
                  </div>
                </Button>
                <Button className="button" type="primary">
                  <div className="button-content">
                    <div>Icici Direct</div>
                  </div>
                </Button>
                <Button className="button" type="primary">
                  <div className="button-content">
                    <div>5Paise</div>
                  </div>
                </Button>
                <Button className="button" type="primary">
                  <div className="button-content">
                    <div>IIFL</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

}

export default Home;
