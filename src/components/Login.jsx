import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/Login.module.css";
import { Container, Form, Button, Card } from "react-bootstrap";

const Login = () => {
  const { login } = useContext(UserContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userInfo = {
      email,
      password,
    };
    let result = await login(userInfo);
    if (result.success) {
      console.log(result.success);
      history.push("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      <Container className={styles.Darkcard} className="mt-5">
        <Card className={styles.Darkcard}>
          <Card.Header as="h4" className="text-center">
            Login
          </Card.Header>
          <Card.Body>
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <p
                className={`${styles.errorBox} ${
                  error ? styles.active : styles.inactive
                }`}
              >
                {error}
              </p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
              <Container className="text-center">
                <Button
                  className={styles.singInButton}
                  variant="secondary"
                  type="submit"
                >
                  Login
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
