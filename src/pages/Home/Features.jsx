import bgShape from "../../assets/about-bg-shape.svg";
import featureImage from "../../assets/section-image.svg";
import { Container } from "../../components/Container";

const Features = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bgShape})` }}
      className="bg-white bg-none bg-cover py-28 mt-10"
    >
      <Container extraStyle={"grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10"}>
        <div className="px-3 md:px-0">
          <h1 className="text-2xl md:text-4xl font-medium tracking-wide mb-10">
            Empowering Athletes with Cutting Edge Tools
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <span className="flex justify-center w-16 h-1/6 bg-white shadow-lg rounded p-4">
                <svg
                  viewBox="0 0 640 512"
                  fill="#6366f1"
                  height="2.1em"
                  width="2.1em"
                >
                  <path d="M192 96c26.5 0 48-21.5 48-48S218.5 0 192 0s-48 21.5-48 48 21.5 48 48 48zm-8 384V352h16v128c0 17.7 14.3 32 32 32s32-14.3 32-32V192h136c17.7 0 32-14.3 32-32s-14.3-32-32-32h-16V64h192v192H384v-32h-64v48c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9l28.7-47.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
                </svg>
              </span>
              <p className="text-gray-500">
                Allow coaches to assign training plans for individual athletes.
                Provide scheduling tools and reminders for training sessions.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex justify-center w-16 h-1/6 bg-white shadow-lg rounded p-4">
                <svg
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  fill="none"
                  height="2.1em"
                  width="2.1em"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path
                    stroke="#6366f1"
                    d="M4 18V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2z"
                  />
                  <path stroke="#6366f1" d="M7 14l3-3 2 2 3-3 2 2" />{" "}
                </svg>
              </span>
              <p className="text-gray-500">
                Track progress over time and identify areas for improvement.
                Make data-driven decisions for training and strategy
                adjustments.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex justify-center w-16 h-1/6 bg-white shadow-lg rounded p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="#6366f1"
                  height="2.1em"
                  width="2.1em"
                >
                  <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 001.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0022 14c0-5.514-4.486-10-10-10zm7.41 13H4.59A7.875 7.875 0 014 14c0-4.411 3.589-8 8-8s8 3.589 8 8a7.875 7.875 0 01-.59 3z" />
                  <path d="M10.939 12.939a1.53 1.53 0 000 2.561 1.53 1.53 0 002.121-.44l3.962-6.038a.034.034 0 000-.035.033.033 0 00-.045-.01l-6.038 3.962z" />
                </svg>
              </span>
              <p className="text-gray-500">
                Monitor and record various performance metrics such as speed,
                strength, endurance, and more.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex justify-center w-16 h-1/6 bg-white shadow-lg rounded p-4">
                <svg
                  viewBox="0 0 640 512"
                  fill="#6366f1"
                  height="2.1em"
                  width="2.1em"
                >
                  <path d="M320 256c-70.7 0-128-57.3-128-128S249.3 0 320 0s128 57.3 128 128-57.3 128-128 128zM40 64c22.1 0 40 17.9 40 40v160.2c0 17 6.7 33.3 18.7 45.3l51.1 51.1c8.3 8.3 21.3 9.6 31 3.1 12.9-8.6 14.7-26.9 3.7-37.8l-15.2-15.2-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32 15.2 15.2 25.3 25.3c21 21 32.8 49.5 32.8 79.2V464c0 26.5-21.5 48-48 48h-66.6c-17 0-33.3-6.7-45.3-18.7l-99.9-99.9C10.1 375.4 0 351 0 325.5V104c0-22.1 17.9-40 40-40zm560 0c22.1 0 40 17.9 40 40v221.5c0 25.5-10.1 49.9-28.1 67.9L512 493.3c-12 12-28.3 18.7-45.3 18.7H400c-26.5 0-48-21.5-48-48v-78.9c0-29.7 11.8-58.2 32.8-79.2l25.3-25.3 15.2-15.2 32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32-15.2 15.2c-11 11-9.2 29.2 3.7 37.8 9.7 6.5 22.7 5.2 31-3.1l51.1-51.1c12-12 18.7-28.3 18.7-45.3V104c0-22.1 17.9-40 40-40z" />
                </svg>
              </span>
              <p className="text-gray-500">
                Offer user support options, including tutorials, documentation,
                and customer service channels.
              </p>
            </div>
          </div>
        </div>
        <div>
          <img className="w-full h-full" src={featureImage} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Features;
