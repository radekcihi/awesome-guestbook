import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
export default function Navbar() {
    return (
        <Box>
            <AppBar position="relative">
                <Toolbar color="secondary">
                    <FavoriteIcon />
                    <Typography  >
                        Application
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}