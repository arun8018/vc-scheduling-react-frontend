import axios from "axios";
const token = "dddabac3b9583d707baa961245502d64be1f18fc";
// const token = window.scheduleapi_token;
// `Bearer ${token}`;
const instance = axios.create({
  baseURL: "http://localhost/litmus7-vc-petco-new/frontend/site/send",
  // baseURL: window.scheduleapi_url,
});

instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
instance.defaults.headers.post["Content-Type"] = "application/json";
export default instance;
