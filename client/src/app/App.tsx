import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '@/app/components/Login';
import { Register } from '@/app/components/Register';
import { Dashboard } from '@/app/components/Dashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A6CF1',
    },
    secondary: {
      main: '#1E88E5',
    },
    background: {
      default: '#0B0F1A',
      paper: '#0E1324',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Lexend Deca', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}