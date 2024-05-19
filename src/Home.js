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
    return (
      <>
        <h1
          style={{
            textShadow: "none",
            fontFamily: "Montserrat",
            paddingBottom: "10px",
          }}
        >
          Welcome {name}
        </h1>
        <div class="hero-section">
          <div class="hero-section1"></div>
        </div>
        <div class="display1">
          <h2>
            Manage your Portfolio better with Cognivitta
            <br />
          </h2>
        </div>
        <div class="display2">
          <p>
            Online platform to tailor, organize and personalize your Portfolio
          </p>
        </div>
        <div class="hero-section2">
          <div class="pic">
            <div class="pic1"></div>
          </div>

          <div class="display3">
            <div class="display4">
              <h2>Categorize your Portfolio</h2>
            </div>

            <div class="display5">
              <p>
                Divide your portfolio into distinct segments <br />
                to risk, sector, or investment style.
              </p>
            </div>
          </div>
        </div>
        <div class="hero-section3">
          <div class="display6">
            <div class="display7">
              <h2>Unified platform</h2>
            </div>

            <div class="display8">
              <p>
                Consolidation of holdings across
                <br />
                various Demat accounts.
              </p>
            </div>
          </div>

          <div class="pic2">
            <div class="pic3"></div>
          </div>
        </div>
      </>
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
                  <h3>Categorize your Portfolio</h3>
                  Divide your portfolio into distinct segments by risk, sector,
                  or investment style.
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
