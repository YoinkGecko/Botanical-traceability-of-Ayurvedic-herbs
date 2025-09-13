import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: "Overview",
      path: "/supply-chain-overview-dashboard",
      icon: "BarChart3",
      description: "Supply chain overview dashboard",
    },
    {
      label: "Performance",
      path: "/stakeholder-performance-analytics",
      icon: "TrendingUp",
      description: "Stakeholder performance analytics",
    },
    {
      label: "Register new member",
      path: "/register-new-member",
      icon: "UserPlus",
      description: "Stakeholder performance analytics",
    },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/supply-chain-overview-dashboard"
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Wheat" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-semibold text-foreground">
                  AgriTrack
                </span>
                <span className="text-xs font-caption text-muted-foreground -mt-1">
                  Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActiveRoute(item?.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                title={item?.description}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Real-time Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-caption text-success font-medium">
                Live
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-foreground">
                  Admin User
                </span>
                <span className="text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-muted"
              >
                <Icon name="User" size={20} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-[1100] bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col p-6 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActiveRoute(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex flex-col">
                    <span>{item?.label}</span>
                    <span className="text-xs text-muted-foreground font-caption">
                      {item?.description}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Mobile Status Indicator */}
              <div className="flex items-center justify-center space-x-2 mt-6 px-4 py-3 bg-success/10 rounded-lg">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">
                  System Online
                </span>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
