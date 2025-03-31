import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Logo = () => {
  return (
    <div
      className="bg-primary p-3"
      style={{
        display: "flex",
        alignItems: "Left",
      }}
    >
      <EventAvailableIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <h3 className="text-white" style={{ fontSize: "24px" }}>
        {" "}
        Event Management System{" "}
      </h3>
    </div>
  );
};

export default Logo;
