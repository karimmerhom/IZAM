"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Badge from "@mui/material/Badge";

interface ProfileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileMenuDrawer({
  open,
  onClose,
}: ProfileMenuDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          height: "100%",
          bgcolor: "white",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header with close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <IconButton onClick={onClose} sx={{ color: "grey.300" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Profile Section */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src="https://as1.ftcdn.net/v2/jpg/03/47/04/28/1000_F_347042883_CmZfcpWoLV2fEZjuERvL5ALd1Sbkmaxo.jpg?height=20&width=20"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ ml: 2, flex: 1 }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: "18px", color: "grey.200" }}
            >
              Ahmed Amaar
            </Typography>
            <Typography sx={{ color: "grey.300", fontSize: "14px" }}>
              UX UI designer
            </Typography>
          </Box>
          <ChevronRightIcon sx={{ color: "grey.300" }} />
        </Box>

        {/* Navigation Menu */}
        <Box
          sx={{ flex: 1, borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
        >
          <Box style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
              <HomeIcon sx={{ color: "grey.300", mr: 2 }} />
              <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
                Home
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
              <WorkIcon sx={{ color: "grey.300", mr: 2 }} />
              <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
                Jobs
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
              <PeopleIcon sx={{ color: "grey.300", mr: 2 }} />
              <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
                Employers
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
              <NotificationsIcon sx={{ color: "grey.300", mr: 2 }} />
              <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
                Notifications
              </Typography>
            </Box>
          </Box>

          <Box
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
              <Badge badgeContent={1} color="error">
                <EmailIcon sx={{ color: "grey.300" }} />
              </Badge>
              <Typography sx={{ color: "grey.500", fontSize: "16px", ml: 2 }}>
                Messaging
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Settings Section */}
        <Box sx={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>
          <Box sx={{ px: 3, py: 2 }}>
            <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
              Setting and privacy
            </Typography>
          </Box>
          <Box sx={{ px: 3, py: 2, cursor: "pointer" }}>
            <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
              Language
            </Typography>
          </Box>
          <Box sx={{ px: 3, py: 2, cursor: "pointer" }}>
            <Typography sx={{ color: "grey.500", fontSize: "16px" }}>
              Help
            </Typography>
          </Box>
        </Box>

        {/* Logout Button */}
        <Box sx={{ p: 3, mt: "auto", cursor: "pointer" }}>
          <Typography
            sx={{
              color: "warning.main",
              fontSize: "16px",
              fontWeight: "medium",
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
