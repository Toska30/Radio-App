
import Login from "../components/Login";
import { useContext } from "react";
import Register from "../components/Register";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { loginPage, toggleText } from "../css/LoginPage.module.css";



const LoginPage = () => {
  const { showLogin, setShowLogin } = useContext(UserContext);

  const toggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container className={loginPage}>
      <div>
        {showLogin ? <Login /> : <Register />}
        <p className={toggleText} onClick={toggle}>
          {showLogin ? "Not a member yet?" : " Login instead"}
        </p>
      </div>
    </Container>
  );
};

export default LoginPage;
