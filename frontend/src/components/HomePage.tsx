import { useState, useEffect } from "react";
import EventCard from "../components/EventCard.tsx";
import MyEventCard from "../components/MyEventCard.tsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function HomePage() {
  const [role, setRole] = useState("user");

  const myEventsInitial = [
    {
      title: "Play ball",
      description: "This will wow you",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Hoops for health",
      description: "Bring your friends",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
  ];

  const [myEvents, setMyEvents] = useState(myEventsInitial);

  const eventsInitial = [
    {
      title: "TEST",
      description: "A cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Raptors meet and greet",
      description: "Another cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Play ball",
      description: "This will wow you",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Hoops for health",
      description: "Bring your friends",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "TEST",
      description: "A cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Raptors meet and greet",
      description: "Another cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Play ball",
      description: "This will wow you",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Hoops for health",
      description: "Bring your friends",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "TEST",
      description: "A cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Raptors meet and greet",
      description: "Another cool event",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Play ball",
      description: "This will wow you",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
    {
      title: "Hoops for health",
      description: "Bring your friends",
      location: "Toronto",
      date: "2025-05-01 at 4 PM",
    },
  ];

  const [events, setEvents] = useState(eventsInitial);

  const handleEventCancel = (index: number) => {
    // add event to events
    events.push(myEvents[index]);

    // remove event from myEvents
    setMyEvents(myEvents.filter((x, i) => i != index));
    console.log(myEvents);
  };

  const handleEventRegistration = (index: number) => {
    // add event to myEvents
    myEvents.push(events[index]);

    // remove event from events
    setEvents(events.filter((x, i) => i != index));
  };

  return (
    <>
      <Box component="section" sx={{ p: 5 }}>
        <Box component="section" sx={{ p: 5 }}>
          <h1>Event Management System</h1>
        </Box>
        <Box component="section" sx={{ p: 5 }}>
          <h1>Your events</h1>

          <Typography variant="h6">
            {myEvents.length} upcoming events
          </Typography>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            useFlexGap
            sx={{
              mt: 3,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {myEvents.map((event, index) => (
              <MyEventCard
                key={index}
                title={event.title}
                description={event.description}
                date={event.date}
                location={event.location}
                cancelClicked={(e) => handleEventCancel(index)}
              ></MyEventCard>
            ))}
          </Stack>
        </Box>
        {role == "user" && (
          <Box component="section" sx={{ p: 5 }}>
            <h1>Trending Events</h1>

            <Typography variant="h6">
              {events.length} available events
            </Typography>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              useFlexGap
              sx={{
                mt: 3,
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {events.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  location={event.location}
                  registerClicked={(e) => handleEventRegistration(index)}
                ></EventCard>
              ))}
            </Stack>

            {/* <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div> */}
          </Box>
        )}
      </Box>
    </>
  );
}

export default HomePage;
