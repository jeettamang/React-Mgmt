export const BASE_URL = import.meta.env.VITE_API_URL;


const API_URL = BASE_URL;

export const URLS = {
  LOGIN: API_URL + "/auth/login",
  REGISTER: API_URL + "/auth/register",
  EMAIL_VERIFICATION:API_URL + "/auth/email-verify",
  REGEN_EMAIL_VERIFICATION: API_URL + "/auth/resend-verification",
    GERNERATE_FORGET_PASSWORD:API_URL + "/auth/forget-password",
  VERIFY_FORGET_PASSWORD: API_URL + "/auth/verify-fp",

};
