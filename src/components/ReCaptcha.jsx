import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ captcha, setCaptcha }) => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (
    <ReCAPTCHA
      sitekey="6LejcD0pAAAAACx2q2UjtTVJoOOJigOQajdbpLfa"
      onChange={(val) => setCaptcha(val)}
    />
  );
};

export default ReCaptcha;
