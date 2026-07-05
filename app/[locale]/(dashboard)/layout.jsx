import DashboardLayoutClient from "./components/DashboardLayoutClient";

const DashboardLayout = ({ children }) => {
  return (
    <DashboardLayoutClient>
      {children}
    </DashboardLayoutClient>
  );
};

export default DashboardLayout;