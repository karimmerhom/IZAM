"use client";

import type React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Navigation from "@/components/navigation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { NavItem } from "@/lib/types";
import { useEffect } from "react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  setItems: React.Dispatch<React.SetStateAction<NavItem[]>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentPath: string;
  onSave: () => void;
  onDiscard: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  items,
  setItems,
  isEditMode,
  setIsEditMode,
  currentPath,
  onSave,
  onDiscard,
}: MobileNavigationProps) {
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Prevent body scrolling when the mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling by fixing the body position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // Restore scrolling when component unmounts or isOpen changes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Prevent touchmove events when in edit mode to avoid conflicts with drag operations
  useEffect(() => {
    // Fixed type definition for the event handler
    const preventScroll = (e: Event) => {
      if (isEditMode && isOpen) {
        e.preventDefault();
      }
    };

    const navigationArea = document.querySelector('.navigation-scroll-area');
    
    if (navigationArea && isEditMode) {
      navigationArea.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        navigationArea.removeEventListener('touchmove', preventScroll);
      };
    }
  }, [isEditMode, isOpen]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={onClose}
      />
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: "grey.300" }}
            >
              <ArrowBackIcon fontSize="small" sx={{ color: "Black" }} />
            </IconButton>
            <Typography variant="subtitle1" fontWeight="medium">
              Menu
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {isEditMode && (
              <IconButton
                size="small"
                onClick={onSave}
                sx={{ color: "grey.300" }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: "secondary.400", fontSize: 25 }}
                />
              </IconButton>
            )}
            {!isEditMode && (
              <IconButton
                size="small"
                onClick={toggleEditMode}
                sx={{ color: "grey.300" }}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box 
          className="navigation-scroll-area"
          sx={{ 
            overflow: "auto", 
            height: "calc(100% - 120px)",
            touchAction: isEditMode ? "none" : "auto" 
          }}
        >
          <Navigation
            items={items}
            setItems={setItems}
            isEditMode={isEditMode}
            currentPath={currentPath}
          />
        </Box>

        {isEditMode && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              component="button"
              onClick={onDiscard}
              sx={{
                flex: 1,
                bgcolor: "background.paper",
                border: "0px solid",
                py: 1,
                px: 2,
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "20px",
                color: "warning.main",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              Cancel
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}