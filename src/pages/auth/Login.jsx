import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import useLogin from "../../hooks/useLogin";
import AlertBox from "../../components/AlertBox";

const Login = () => {
  const { payload, setPayload, isLoading, isDisabled, err, msg, handleSubmit } =
    useLogin();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
          <p className="text-center mt-3 mb-2">Login to your account</p>
          <div className="text-center mt-3 mb-2">
            {err && <AlertBox label={err} />}
            {msg && <AlertBox variant="success" label={msg} />}
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleDropdownFormEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleDropdownFormEmail1"
                placeholder="email@example.com"
                required
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleDropdownFormPassword1"
                className="form-label"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleDropdownFormPassword1"
                placeholder="Password"
                required
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keepLoggedIn"
                />
                <label className="form-check-label" htmlFor="keepLoggedIn">
                  Keep me logged in
                </label>
              </div>
              <Link
                to="/auth/forgot-password"
                className="small text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="d-grid mb-3">
              <CustomButton
                variant="success"
                className="py-2"
                label="Submit"
                loading={isLoading}
                disabled={isDisabled}
                onClick={() => handleSubmit({payload})}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/auth/register" className="text-decoration-none">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
