import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster />
    </>
  );
}

export default Layout;
