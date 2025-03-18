"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import theme from "@/lib/theme"; 
import Dashboard from "@/components/dashboard";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Dashboard />
    </ThemeProvider>
  );
}
