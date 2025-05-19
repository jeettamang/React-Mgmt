import { Button, Form } from "react-bootstrap";
import { useRef } from "react";
import { Link } from "react-router";
import AlertBox from "../../components/AlertBox";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const registerRef = useRef(null);
  const { err, setErr, msg, setMsg, isDisabled, handleSubmit } =
    useRegister(registerRef);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card shadow-sm p-3"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="text-center">
            <img
              src="blog.png"
              alt="blog"
              className="img-fluid rounded"
              style={{ maxWidth: "200px" }}
            />
          </div>
          <div className="text-center px-3">
            <p className="text-black mb-2">Creat a new account</p>
          </div>
          <div className="text-center mt-3 mb-2">
            {err && <AlertBox label={err} />}
            {msg && <AlertBox variant="success" label={msg} />}
          </div>
          <div className="card-body">
            <Form ref={registerRef} onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Upload your picture</Form.Label>
                <Form.Control type="file" name="image"></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter your fullName"
                  name="name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  required
                />
              </Form.Group>
              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isDisabled}
                >
                  Submit
                </Button>
              </div>
               <div className="d-flex justify-content-center align-items-center gap-2">
              <p className="mb-0">Already have an account?</p>
              <Link to="/auth/login" className="text-decoration-none">
                Login
              </Link>
            </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
