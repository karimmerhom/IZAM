"use client";

import type React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import theme from "@/lib/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChevronRight } from "lucide-react";
import CssBaseline from "@mui/material/CssBaseline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Navigation from "@/components/navigation";
import MobileNavigation from "@/components/mobile-navigation";
import JobCard from "@/components/job-card";
import type { NavItem } from "@/lib/types";
import { fetchNavigation, saveNavigation } from "@/lib/api";
import { useMobile } from "@/hooks/use-mobile";
import { ChevronDown } from "lucide-react";
import ProfileMenuDrawer from "@/components/profile-menu-drawer";

export default function Dashboard() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [originalNavItems, setOriginalNavItems] = useState<NavItem[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Top match");
  const pathname = usePathname();
  const isMobile = useMobile();
  const [profileMenuDrawerOpen, setProfileMenuDrawerOpen] = useState(false);

  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const data = await fetchNavigation();
        setNavItems(data);
        setOriginalNavItems(JSON.parse(JSON.stringify(data)));
      } catch (error) {
        console.error("Failed to load navigation:", error);
      }
    };

    loadNavigation();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await saveNavigation(navItems);
      setOriginalNavItems(JSON.parse(JSON.stringify(navItems)));
      setIsEditMode(false);
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes.");
      console.error("Failed to save navigation:", error);
    }
  };

  const handleDiscardChanges = () => {
    setNavItems(JSON.parse(JSON.stringify(originalNavItems)));
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleMobileNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    handleSortClose();
  };

  // Job data to match the Figma design
  const jobs = [
    {
      id: 1,
      title: "Gaming UI designer",
      company: "Rockstar Games",
      location: "ElMansoura, Egypt",
      postedDays: 10,
      experience: "0 - 3y of exp",
      jobType: "Full time",
      workType: "Remote",
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
      logo: "/rockstar-logo.png",
    },
    {
      id: 2,
      title: "Senior UX UI Designer",
      company: "Egabi",
      location: "Cairo, Egypt",
      postedDays: 30,
      experience: "0 - 3y of exp",
      jobType: "Full time",
      workType: "Hybrid",
      categories: ["Creative / Design", "IT / Software development"],
      logo: "/egabi-logo.png",
    },
    {
      id: 3,
      title: "React Frontend developer",
      company: "Magara",
      location: "Cairo, Egypt",
      postedDays: 30,
      experience: "5 - 7y of exp",
      jobType: "Freelance",
      workType: "Remote",
      categories: ["Creative / Design", "IT / Software development"],
      logo: "/magara-logo.png",
    },
    {
      id: 4,
      title: "Gaming UI designer",
      company: "Rockstar Games",
      location: "ElMansoura, Egypt",
      postedDays: 10,
      experience: "0 - 3y of exp",
      jobType: "Full time",
      workType: "Remote",
      categories: ["Creative / Design", "IT / Software development", "Gaming"],
      logo: "/rockstar-logo.png",
    },
    {
      id: 5,
      title: "Senior UX UI Designer",
      company: "Egabi",
      location: "Cairo, Egypt",
      postedDays: 30,
      experience: "0 - 3y of exp",
      jobType: "Full time",
      workType: "Hybrid",
      categories: ["Creative / Design", "IT / Software development"],
      logo: "/egabi-logo.png",
    },
    {
      id: 6,
      title: "React Frontend developer",
      company: "Magara",
      location: "Cairo, Egypt",
      postedDays: 30,
      experience: "5 - 7y of exp",
      jobType: "Freelance",
      workType: "Remote",
      categories: ["Creative / Design", "IT / Software development"],
      logo: "/magara-logo.png",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileOpen &&
        !(event.target as Element).closest("[data-profile-dropdown]")
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Top Navigation Bar */}
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            borderBottom: "1px solid #2a2a2a",
            bgcolor: "secondary.100",
          }}
        >
          <Toolbar
            sx={{
              minHeight: 64,
              display: "flex",
              flexDirection: isMobile ? "row-reverse" : "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                i<span style={{ color: theme.palette.primary.main }}>Z</span>AM
              </Typography>
              {!isMobile && (
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                    height: 36,
                    borderRadius: 20,
                    bgcolor: "White",
                    border: "1px solid #444",
                  }}
                >
                  <IconButton
                    sx={{
                      p: "2px",
                      color: "white",
                      backgroundColor: "secondary.400",
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1, color: "secondary.500" }}
                    placeholder="Search by name, job title..."
                    inputProps={{ "aria-label": "search" }}
                  />
                </Paper>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isMobile && (
                <>
                  <IconButton
                    color="inherit"
                    sx={{ color: "white", flexDirection: "column" }}
                  >
                    <HomeIcon sx={{ color: "grey.100" }} />
                    <Typography
                      sx={{
                        color: "grey.100",
                        fontSize: "10px",
                        fontWeight: "normal",
                      }}
                    >
                      Home
                    </Typography>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{ color: "white", flexDirection: "column" }}
                  >
                    <WorkIcon />
                    <Typography
                      sx={{
                        color: "grey.100",
                        fontSize: "10px",
                        fontWeight: "normal",
                      }}
                    >
                      Jobs
                    </Typography>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{ color: "white", flexDirection: "column" }}
                  >
                    <PeopleIcon sx={{ color: "grey.100" }} />
                    <Typography
                      sx={{
                        color: "grey.100",
                        fontSize: "10px",
                        fontWeight: "normal",
                      }}
                    >
                      Employees
                    </Typography>
                  </IconButton>
                  <Box
                    sx={{ height: "40px", width: "0.5px", bgcolor: "grey.100" }}
                  />
                  <IconButton
                    color="inherit"
                    sx={{ color: "white", flexDirection: "column" }}
                  >
                    <Box>
                      <Badge badgeContent={1} color="error">
                        <NotificationsIcon sx={{ color: "grey.100" }} />
                      </Badge>
                    </Box>
                    <Typography
                      sx={{
                        color: "#E6E6E6",
                        fontSize: "10px",
                        fontWeight: "normal",
                      }}
                    >
                      Notifications
                    </Typography>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{ color: "white", flexDirection: "column" }}
                  >
                    <Box>
                      <Badge badgeContent={3} color="error">
                        <EmailIcon sx={{ color: "grey.100" }} />
                      </Badge>
                      <Typography
                        sx={{
                          color: "grey.100",
                          fontSize: "10px",
                          fontWeight: "normal",
                        }}
                      >
                        Mail
                      </Typography>
                    </Box>
                  </IconButton>
                </>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: isMobile ? 0 : 2,
                  cursor: "pointer",
                  position: "relative",
                  flexDirection: "column",
                }}
                onClick={() =>
                  isMobile
                    ? setProfileMenuDrawerOpen(true)
                    : setProfileOpen(!profileOpen)
                }
                data-profile-dropdown
              >
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/47/04/28/1000_F_347042883_CmZfcpWoLV2fEZjuERvL5ALd1Sbkmaxo.jpg?height=20&width=20"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    ml: 1,
                    mt: 0.5,
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "normal",
                  }}
                >
                  Profile <ChevronDown width={12} height={12} />
                </Typography>

                {profileOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      right: isMobile ? -250 : 0,
                      mt: 1,
                      width: 300,
                      bgcolor: "white",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #E6E6E6",
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
                          src="https://as1.ftcdn.net/v2/jpg/03/47/04/28/1000_F_347042883_CmZfcpWoLV2fEZjuERvL5ALd1Sbkmaxo.jpg?height=56&width=56"
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{ ml: 2, flex: 1, justifyContent: "space-between" }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "grey.200",
                          }}
                        >
                          Ahmed Amaar
                        </Typography>
                        <Typography
                          sx={{ color: "grey.300", fontSize: "14px" }}
                        >
                          UX UI designer
                        </Typography>
                      </Box>
                      <ChevronRight className="ml-auto h-5 w-5 text-[#707070]" />
                    </Box>

                    <Box sx={{ py: 2, borderBottom: "1px solid #E6E6E6" }}>
                      <Typography
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "grey.300",
                          fontSize: "16px",
                        }}
                      >
                        Setting and privacy
                      </Typography>
                      <Typography
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "grey.300",
                          fontSize: "16px",
                        }}
                      >
                        Language
                      </Typography>
                      <Typography
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "grey.300",
                          fontSize: "16px",
                        }}
                      >
                        Help
                      </Typography>
                    </Box>

                    <Box sx={{ py: 2 }}>
                      <Typography
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "warning.main",
                          fontSize: "16px",
                          fontWeight: "medium",
                        }}
                      >
                        Logout
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                width: 260,
                bgcolor: "background.paper",
                borderRight: 1,
                borderColor: "divider",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  Menu
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={isEditMode ? handleDiscardChanges : toggleEditMode}
                    sx={{ color: "grey.300" }}
                  >
                    {isEditMode ? (
                      <HighlightOffIcon
                        sx={{ color: "warning.main", fontSize: 25 }}
                      />
                    ) : (
                      <SettingsIcon fontSize="small" />
                    )}
                  </IconButton>
                  {isEditMode && (
                    <IconButton
                      size="small"
                      onClick={handleSaveChanges}
                      sx={{ color: "grey.300" }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{ color: "primary.main", fontSize: 25 }}
                      />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Navigation
                items={navItems}
                setItems={setNavItems}
                isEditMode={isEditMode}
                currentPath={pathname}
              />
            </Box>
          )}

          {/* Main Content */}
          <Box
            sx={{ flexGrow: 1, overflow: "auto", bgcolor: "background.dfault" }}
          >
            {/* Mobile Navigation Overlay */}
            {isMobile && (
              <MobileNavigation
                isOpen={isNavOpen}
                onClose={() => setIsNavOpen(false)}
                items={navItems}
                setItems={setNavItems}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                currentPath={pathname}
                onSave={handleSaveChanges}
                onDiscard={handleDiscardChanges}
              />
            )}
            {isMobile && (
              <ProfileMenuDrawer
                open={profileMenuDrawerOpen}
                onClose={() => setProfileMenuDrawerOpen(false)}
              />
            )}

            {/* Job Listings Content */}
            <Box sx={{ p: 3 }}>
              {/* Header with sorting */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    Sorting by:
                  </Typography>
                  <Box
                    onClick={handleSortClick}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "primary.main",
                      fontWeight: "medium",
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    {selectedSort}
                    <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
                  </Box>

                  {/* Sort Menu */}
                  <Menu
                    anchorEl={sortAnchorEl}
                    open={Boolean(sortAnchorEl)}
                    onClose={handleSortClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                        mt: 1.5,
                        width: 300,
                        borderRadius: 2,
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        ml: 2,
                        mb: 1,
                        mt: 1,
                      }}
                    >
                      <Typography
                        fontWeight="bold"
                        variant="body2"
                        color="text.primary"
                        sx={{ mr: 1 }}
                      >
                        Sorting by:
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "primary.main",
                          fontWeight: "medium",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          px: 1.5,
                        }}
                      >
                        {selectedSort}
                        <KeyboardArrowUpIcon
                          fontSize="small"
                          sx={{ ml: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <MenuItem
                      sx={{
                        color:
                          selectedSort === "Top match"
                            ? "primary.main"
                            : "text.secondary",
                        backgroundColor:
                          selectedSort === "Top match" ? "grey.400" : "unset",
                        padding: 1.5,
                      }}
                      onClick={() => handleSortSelect("Top match")}
                    >
                      Top match
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color:
                          selectedSort === "Most recent"
                            ? "primary.main"
                            : "text.secondary",
                        backgroundColor:
                          selectedSort === "Most recent" ? "grey.400" : "unset",
                        padding: 1.5,
                      }}
                      onClick={() => handleSortSelect("Most recent")}
                    >
                      Most recent
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color:
                          selectedSort === "Highest salary"
                            ? "primary.main"
                            : "text.secondary",
                        backgroundColor:
                          selectedSort === "Highest salary"
                            ? "grey.400"
                            : "unset",
                        padding: 1.5,
                      }}
                      onClick={() => handleSortSelect("Highest salary")}
                    >
                      Highest salary
                    </MenuItem>
                    <MenuItem
                      sx={{
                        color:
                          selectedSort === "Lowest salary"
                            ? "primary.main"
                            : "text.secondary",
                        backgroundColor:
                          selectedSort === "Lowest salary"
                            ? "grey.400"
                            : "unset",
                        padding: 1.5,
                      }}
                      onClick={() => handleSortSelect("Lowest salary")}
                    >
                      Lowest salary
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>

              {/* Alert Banner */}
              <Box display={"flex"} flexDirection={"row"} gap={1}>
                <Paper
                  elevation={0}
                  sx={{
                    py: isMobile ? 1 : 2,
                    px: 2,
                    mb: 2,
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 1,
                    flex: 1,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      UI Designer in Egypt
                    </Typography>
                    <Typography variant="body2">70 job positions</Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={true}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "white",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "rgba(255, 255, 255, 0.5)",
                            },
                        }}
                      />
                    }
                    label="Set alert"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "white",
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                </Paper>
                {isMobile && (
                  <IconButton
                    onClick={toggleMobileNav}
                    sx={{
                      p: 2,
                      mb: 2,
                      w: 20,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 1,
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderColor: "divider",
                      color: "grey.300",
                    }}
                  >
                    <MenuIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              {/* Job Cards */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </Box>

              {/* Pagination */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e0e0e0",
                    color: "#666",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                  }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e0e0e0",
                    color: "#666",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                  }}
                >
                  1
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  2
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e0e0e0",
                    color: "#666",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                  }}
                >
                  3
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e0e0e0",
                    color: "#666",
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                  }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
