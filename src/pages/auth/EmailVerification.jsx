import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { URLS } from "../../constants";
import instance from "../../utils/axios";
import errorParser from "../../utils/errorParser";
import AlertBox from "../../components/AlertBox";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [payload, setPayload] = useState({
    email: state?.email || "",
    token: "",
  });

  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setErr("");
    setMsg("");

    try {
      const { data } = await instance.post(URLS.EMAIL_VERIFICATION, payload);
      console.log("Verification Response:", data);

      setMsg("Verification successful! Redirecting...");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      const rawError = error?.response?.data?.msg || "Something went wrong";
      setErr(errorParser(rawError));
    } finally {
      setIsDisabled(false);
    }
  };

  const handleEmailRegen = async (event) => {
    event.preventDefault();
    console.log("Email regen");
    try {
      setMsg("");
      setErr("");
      const { data } = await instance.post(URLS.REGEN_EMAIL_VERIFICATION, {
        email: payload?.email,
      });
      console.log("Verification Response:", data);
    } catch (error) {
      const rawError = error?.response?.data?.msg || "Something went wrong";
      setErr(errorParser(rawError));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div className="text-center">
          <img
            src="blog.png"
            alt="blog"
            className="img-fluid rounded"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <h3 className="text-center">Please check your email</h3>
        <p>
          We've emailed a 6-digit confirmation code. Please check your mail and
          fill in the code below.
        </p>
        <div className="text-center mt-3 mb-2">
          {err && <AlertBox label={err} />}
          {msg && <AlertBox variant="success" label={msg} />}
        </div>
        <form className="mx-2 mb-2" onSubmit={handleVerify}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={payload.email}
              className="form-control"
              id="email"
              placeholder="email@example.com"
              required
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              name="token"
              value={payload.token}
              className="form-control"
              id="token"
              placeholder="Enter 6-digit code"
              required
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, token: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isDisabled}
          >
            {isDisabled ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="mt-3" style={{ fontSize: "0.9rem" }}>
          Didn't get the code?
          <a
            role="button"
            className="link-offset-2 link-underline link-underlinle-opacity-0"
            style={{textDecoration: "none"}}
            onClick={(event) => handleEmailRegen(event)}
          >
            Resend
          </a>
        </p>
        <div className="d-flex justify-content-center">
          Return to
          <Link
          to="/auth/login"
            style={{textDecoration: "none"}}>
            Sign in
        </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
