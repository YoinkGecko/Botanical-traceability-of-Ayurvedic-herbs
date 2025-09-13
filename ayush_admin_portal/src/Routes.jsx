import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import LoadingScreen from "pages/LoadingScreen";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import AdminManagement from "pages/AdminManagement";
import BlockchainExplorer from "pages/BlockchainExplorer";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoadingScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-management" element={<AdminManagement />} />
          <Route path="/blockchain-explorer" element={<BlockchainExplorer />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
