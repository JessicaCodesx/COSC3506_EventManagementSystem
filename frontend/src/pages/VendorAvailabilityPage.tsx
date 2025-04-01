import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const VendorAvailabilityPage: React.FC = () => {
  const { user, role } = useAuth();

  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const mockBlockedOffDates = [
    {
      Start: "2025-01-01",
      End: "2025-01-10",
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="mb-4"
          >
            Add block
          </Typography>

          <div className="mb-3">
            <label>Start</label>
            <input className="form-control" type="date" />
          </div>

          <div>
            <label>End</label>
            <input className="form-control" type="date" />
          </div>

          <div className="text-end mt-4">
            <button className="btn btn-primary btn-sm" onClick={handleClose}>
              Save
            </button>
          </div>
        </Box>
      </Modal>

      <div className="dashboard-page">
        <Sidebar userRole={role} />
        <div className="dashboard-content">
          <DashboardHeader userRole={role} />
          <main className="dashboard-main">
            <div className="form-page-container">
              <div className="form-page-header">
                <h1>Availabiliy</h1>
                <p>
                  Update your availability by indicating which dates you're
                  available for
                </p>
                <button className="btn btn-primary" onClick={handleOpen}>
                  Add block
                </button>
              </div>

              <h4>Available from</h4>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBlockedOffDates.map((dateBlock, index) => (
                    <tr key={index}>
                      <td>{dateBlock.Start}</td>
                      <td>{dateBlock.End}</td>
                      <td>
                        <a className="action-button">
                          <ClearIcon className="text-danger"></ClearIcon>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorAvailabilityPage;
