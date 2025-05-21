import { useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../utils/axios";
import { URLS } from "../constants";
import errorParser from "../utils/errorParser";

const useRegister = (registerRef) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      setErr("");
      setMsg("");

      const rawData = registerRef.current;
      const formData = new FormData(rawData);

      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        setErr("Passwords do not match.");
        setIsDisabled(false);
        return;
      }

      const { data } = await instance.post(URLS.REGISTER, formData);

      setMsg(data?.message);
      setTimeout(() => {
        setMsg("");
        navigate("/auth/email-verify", { state: { email: formData.get("email") } });
      }, 2000);
    } catch (error) {
      console.error("REGISTER ERROR", error?.response?.data);
      const backendError = error?.response?.data;

      if (backendError?.validation) {
        // Show first validation error
        const firstError = Object.values(backendError.validation)[0];
        setErr(firstError);
      } else if (backendError?.message) {
        setErr(backendError.message);
      } else {
        setErr("Something went wrong.");
      }
    } finally {
      setIsDisabled(false);
    }
  };

  return { err, setErr, msg, setMsg, handleSubmit, isDisabled };
};

export default useRegister;
