import { useState, useEffect } from "react";
import EventCard from "./EventCard.tsx";
import MyEventCard from "./MyEventCard.tsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";

function ProfilePage() {
  const userProfileInitial = {
    FirstName: "John",
    LastName: "Smith",
    Email: "john.smith@gmail.com",
    Phone: "416-123-1234",
    Country: "Canada",
    City: "Toronto",
    Street: "123 Yonge Street",
    Postal: "M6B 4N9",
  };

  const eventsInitial = [
    {
      Name: "First Game",
      Cost: 123,
      Date: "2024-01-26",
    },
    {
      Name: "Home Opener",
      Cost: 105,
      Date: "2024-01-26",
    },
  ];

  const [userProfile, setUserProfile] = useState(userProfileInitial);
  const [userEventHistory, setUserEventHistory] = useState(eventsInitial);

  return (
    <>
      <Box className="h-100" component="section" sx={{ p: 5 }}>
        <div className="">
          <div className="card bg-white shadow rounded p-5">
            <div className="row">
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Typography variant="h5" className="mb-3 fw-bold">
                  Profile
                </Typography>
                <Typography variant="h4">
                  {userProfile.FirstName} {userProfile.LastName}
                </Typography>

                <div className="d-flex">
                  <AlternateEmailIcon className="me-2 my-auto"></AlternateEmailIcon>
                  <Typography variant="h6">{userProfile.Email}</Typography>
                </div>

                <div className="d-flex">
                  <PhoneIcon className="me-2 my-auto"></PhoneIcon>
                  <Typography variant="h6">{userProfile.Phone}</Typography>
                </div>
              </div>
              <div className="col-lg-10 col-md-6 col-sm-12">
                <div>
                  <Typography variant="h4" className="mb-3">
                    Billing Information
                  </Typography>

                  <div>
                    <div className="row">
                      <div className="col-1">Country</div>
                      <div className="col-11">{userProfile.Country}</div>
                    </div>
                    <div className="row">
                      <div className="col-1">City</div>
                      <div className="col-11">{userProfile.City}</div>
                    </div>
                    <div className="row">
                      <div className="col-1">Street</div>
                      <div className="col-11">{userProfile.Street}</div>
                    </div>
                    <div className="row">
                      <div className="col-1">Postal Code</div>
                      <div className="col-11">{userProfile.Postal}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Typography variant="h4">Event History</Typography>

                  {userEventHistory.map((event, index) => (
                    <div className="card border rounded p-3 my-3">
                      <Typography variant="h5">{event.Name}</Typography>

                      <div className="d-flex">
                        <div className="d-flex mt-2">
                          <EventIcon className="me-2"></EventIcon>
                          {event.Date}
                        </div>

                        <div className="d-flex mt-2 ms-3">
                          <AttachMoneyIcon className="me-2"></AttachMoneyIcon>
                          {(Math.round(event.Cost * 100) / 100).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default ProfilePage;
