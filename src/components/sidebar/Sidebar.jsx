import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FilterFramesOutlinedIcon from "@mui/icons-material/FilterFramesOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "#0B2557",
        height: "100vh",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <HomeOutlinedIcon sx={{ color: "white", fontSize: 40 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "400", textAlign: "center", padding: 5 }}
            >
              Admin
            </Typography>
          </Box>
          <nav>
            <List>
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <WidgetsOutlinedIcon />
                  </ListItemIcon>
                  <Link to="/">
                    <ListItemText primary="Dashboard" />
                  </Link>
                </ListItemButton>
              </ListItem>
              
       
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <DonutSmallOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <ShowChartOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Stock" />
                </ListItemButton>
              </ListItem>
         
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <GroupsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <EmailOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Messages" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <FavoriteBorderOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favourite" />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Setings" />
                </ListItemButton>
              </ListItem>
              <Box sx={{ height: 40 }} />
              <ListItem
                sx={{
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
