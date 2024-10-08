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
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()));
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Route default page to Login */}
            <Route path='/' element={<LoginPage />} />
            <Route path='/homePage' element={ isAuth ? <HomePage /> : <Navigate to="/" />} />
            {/* Make each profile user page unique via path */}
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage />  : <Navigate to="/" />} />
          </Routes>
          </ThemeProvider>
        </BrowserRouter>
  </div>
  );
}

export default App;
