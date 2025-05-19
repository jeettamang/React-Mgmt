import { setItem, setToken } from "../utils/session";
import errorParser from "../utils/errorParser";
import instance from "../utils/axios";
import { useState } from "react";
import { URLS } from "../constants";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async ({payload}) => {
    try {
      setIsLoading(true);
      setIsDisabled(true);
      setErr("");

      const { data } = await instance.post(URLS.LOGIN, payload);
      console.log("Login Response:", data);

      setToken(data?.token);
      setItem(
        "currentUser",
        JSON.stringify({ name: data?.name, email: data?.email })
      );

      setMsg(data?.message);
      setTimeout(() => {
        setMsg("");
        navigate("/admin");
      }, 2000);
    } catch (error) {
      const err = error?.response?.data?.msg || "Something went wrong";
      setErr(errorParser(err));
    } finally {
      setPayload({ email: "", password: "" });
      setIsLoading(false);
      setIsDisabled(false);
    }
  };
  return {
    payload,
    setPayload,
    isLoading,
    isDisabled,
    msg,
    err,
    handleSubmit,
  };
};
export default useLogin;
