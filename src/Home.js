import { Button } from "antd";
import axios from "axios";

function Home() {
  const login = async () => {
    const res = await axios.get("http://localhost:8080/v1/login");

    if (res.status === 200) {
      window.location.assign(res.data.url);
    }
  };

  if (localStorage.getItem("token") != null) {
    return "User login successful ";
  }

  return (
    <Button className="button" type="primary" onClick={login}>
      <div>Upstox</div>
    </Button>
  );
}

export default Home;
