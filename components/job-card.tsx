import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface JobProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    postedDays: number;
    experience: string;
    jobType: string;
    workType: string;
    categories: string[];
    logo: string;
  };
}

export default function JobCard({ job }: JobProps) {
  // Generate a placeholder logo based on company name
  const logoUrl =
    job.company === "Rockstar Games"
      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23005eff'/%3E%3Cpath d='M32 16 L48 32 L32 48 L16 32 Z' fill='white'/%3E%3C/svg%3E"
      : job.company === "Egabi"
      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2300c2ff'/%3E%3Cpath d='M20 20 L44 20 L44 44 L20 44 Z' fill='white'/%3E%3C/svg%3E"
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23ff5722'/%3E%3Cpath d='M16 16 L48 16 L48 48 L16 48 Z' stroke='white' strokeWidth='4' fill='none'/%3E%3C/svg%3E";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        "&:hover": {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Company Logo */}
          <Box
            component="img"
            src={logoUrl}
            alt={job.company}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              objectFit: "cover",
            }}
          />

          {/* Job Details */}
          <Box>
            <Typography variant="h6" fontWeight="medium" sx={{ mb: 0.5 }}>
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {job.company}
            </Typography>

            {/* Location and Posted Date */}
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOnIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {job.location}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarTodayIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {job.postedDays} days ago
                </Typography>
              </Box>
            </Box>

            {/* Job Type Chips */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label={job.experience}
                size="small"
                sx={{
                  bgcolor: "grey.400",
                  color: "text.secondary",
                  height: 24,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={job.jobType}
                size="small"
                sx={{
                  bgcolor: "grey.400",
                  color: "text.secondary",
                  height: 24,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={job.workType}
                size="small"
                sx={{
                  bgcolor: "grey.400",
                  color: "text.secondary",
                  height: 24,
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Favorite Button */}
        <IconButton sx={{ color: "#ccc" }}>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        {job.categories.map((category, index) => (
          <Chip
            key={index}
            label={category}
            size="small"
            sx={{
              bgcolor: "grey.400",
              color: "text.secondary",
              height: 24,
              fontSize: "0.75rem",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
