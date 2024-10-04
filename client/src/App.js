import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './scenes/homePage/home';
import LoginPage from './scenes/loginPage/login';
import Navbar from './scenes/navbar/nav';
import ProfilePage from './scenes/profilePage/profile';
// Was gonna use material UI but unnecessary
import { useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()));

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Routes>
            {/* Route default page to Login */}
            <Route path='/' element={<LoginPage />} />
            <Route path='/homePage' element={<HomePage />} />
            {/* Make each profile user page unique via path */}
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
          </ThemeProvider>
        </BrowserRouter>
  </div>
  );
}

export default App;
