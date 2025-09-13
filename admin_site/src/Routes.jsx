import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SupplyChainOverviewDashboard from "./pages/supply-chain-overview-dashboard";
import StakeholderPerformanceAnalytics from "./pages/stakeholder-performance-analytics";
import Login from "pages/login_register/Login";
import Registernewmember from "pages/register_new_member/Registernewmember";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/register-new-member" element={<Registernewmember />} />
          <Route
            path="/supply-chain-overview-dashboard"
            element={<SupplyChainOverviewDashboard />}
          />
          <Route
            path="/stakeholder-performance-analytics"
            element={<StakeholderPerformanceAnalytics />}
          />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
