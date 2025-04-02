import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Availibility,
  VendorAvailabilityService,
} from "../services/apiService";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const VendorAvailabilityPage: React.FC = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState<Availibility[]>([]);
  const [error, setError] = useState<string | null>(null);

  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    start: "",
    end: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const data = await VendorAvailabilityService.getAll(user.id);
        setAvailability([...data]);
      } catch (err: any) {
        setError(err.message || "Failed to fetch availability details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      let newAvailability = await VendorAvailabilityService.add(
        user?.id,
        formData.start,
        formData.end
      );

      let temp = [...availability];
      temp.push(newAvailability);
      setAvailability(temp);
      // setAvailability(await VendorAvailabilityService.getAll(user.id));
    } catch (err: any) {
      setError(err.message || "Failed to add availability");
    }

    handleClose();
  };

  const handleRemoveAvailability = async (availabilityID: number) => {
    await VendorAvailabilityService.remove(availabilityID);

    let temp = [...availability];
    let index = temp.findIndex((x) => x.id === availabilityID);
    temp.splice(index, 1);
    setAvailability(temp);
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Start</label>
              <input
                id="start"
                name="start"
                className="form-control"
                type="date"
                required
                value={formData.start}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>End</label>
              <input
                className="form-control"
                type="date"
                id="end"
                name="end"
                required
                value={formData.end}
                onChange={handleChange}
              />
            </div>

            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
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
              </div>

              <div className="">
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
                    {availability.map((dateBlock, index) => (
                      <tr key={dateBlock.id}>
                        <td>{dateBlock.start}</td>
                        <td>{dateBlock.end}</td>
                        <td>
                          <a
                            className="action-button"
                            onClick={() =>
                              handleRemoveAvailability(dateBlock.id)
                            }
                          >
                            <ClearIcon className="text-danger"></ClearIcon>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex mt-5 pt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
                    <ChevronLeftIcon />
                    Back
                  </button>
                  <button
                    className="btn btn-primary ms-auto"
                    onClick={handleOpen}
                  >
                    Add block
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorAvailabilityPage;
