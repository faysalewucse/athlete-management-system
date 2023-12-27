import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ setErrorMsg, setCaptcha }) => {
  function onChange(value) {
    setCaptcha(value);
    setErrorMsg("");
  }

  return (
    <ReCAPTCHA
      sitekey="6LejcD0pAAAAACx2q2UjtTVJoOOJigOQajdbpLfa"
      onChange={onChange}
    />
  );
};

export default ReCaptcha;
