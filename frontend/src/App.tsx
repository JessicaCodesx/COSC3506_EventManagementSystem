import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Appbar from "./components/Appbar.tsx";
import HomePage from "./components/HomePage.tsx";
import ProfilePage from "./components/ProfilePage.tsx";
import EventForm from "./components/EventForm.tsx";
import LoginPage from "./components/LoginPage.tsx";

import Box from "@mui/material/Box";

import "./App.css";

function App() {
  const [isLoggedIn, setLogin] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {!isLoggedIn && <LoginPage />}
        {isLoggedIn && (
          <div>
            <BrowserRouter>
              <Appbar></Appbar>
              <Box component="section" sx={{ p: 5 }}>
                <div>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Profile" element={<ProfilePage />} />
                    <Route path="/New" element={<EventForm />} />
                  </Routes>
                </div>
              </Box>
            </BrowserRouter>
          </div>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
