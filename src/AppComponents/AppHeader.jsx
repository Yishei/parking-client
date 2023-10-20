import HeadPopover from "./HeadPopover";

const AppHeader = () => {
  return (
    <div className="app-head-div">
      <a href="/app">
        <img
          style={{ marginLeft: "10px" }}
          src="/app/safetyhood.svg"
          alt="Safetyhood"
          width="150"
          height="75"
        />
      </a>
      <HeadPopover />
    </div>
  );
};

export default AppHeader;
