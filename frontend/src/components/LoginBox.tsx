import { ReactNode } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface Props {
  loginClicked: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginBox = () => {
  return (
    <form>
      <div
        className={`bg-white p-5 rounded d-flex flex-column`}
        style={{
          width: "400px",
          minHeight: "500px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="d-flex pb-2">
          <EventAvailableIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <h5 className="text-secondary-emphasis">Event Management System</h5>
        </div>

        <div
          className="mx-auto mb-4"
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <label
            className="text-secondary-emphasis fw-bold"
            style={{
              fontSize: "36px",
            }}
          >
            Username
          </label>
          <input type="text" className="form-control formcontrol-lg"></input>
        </div>

        <div
          className="mx-auto"
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <label
            className="text-secondary-emphasis fw-bold"
            style={{ fontSize: "36px" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control formcontrol-lg"
          ></input>
        </div>

        <div className="mx-auto mt-5 me-5">
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="ms-auto mt-auto">
          <label
            className="text-secondary-emphasis fw-bold"
            style={{
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            Vendor (Check if vendor)
          </label>
          <input type="checkbox"></input>
        </div>
      </div>
    </form>
  );
};

export default LoginBox;
