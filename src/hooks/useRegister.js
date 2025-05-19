import { useNavigate } from "react-router";
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
      setMsg("")
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
        navigate("/auth/email-verify");
      }, 2000);
    } catch (error) {
      const err = error?.response?.data?.msg || "Something went wrong";
      setErr(errorParser(err));
    } finally {
      setIsDisabled(false);
      setMsg("")
    }
  };
  return { err, setErr, msg, setMsg, handleSubmit, isDisabled };
};

export default useRegister;
