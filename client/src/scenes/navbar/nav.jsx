import { useState } from "react";
import { Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    useTheme,
    FormControl,
    useMediaQuery,
} from "@mui/material";
import {
    Search,
    Message,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "state";
import { Form, Navigate, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    
    // Option for small screen mobile menu
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    // For reducer functionality
    const dispatch = useDispatch();
    // Navigation functionality
    const navigate = useNavigate();
    // Grab user data from state
    // const user = useSelector((state) => state.user);
    // Option for minimum width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
    const theme = useTheme();
    const gray = "#CBCBD4";
    const blue = "#004E64";
    const yellow = "#DBD56E"
    const red = "#EE6352";

    // const fullName = `${user.firstName} ${user.lastName}`
    const fullName = `Sathvik Parasa`
    return (
        <FlexBetween padding="1rem 6%" backgroundColor="#FFF">
            <FlexBetween gap="1.75rem">
                {/* Clamp determines min/max/preferred value for the font */}
                <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)"
                            color="#0c5b71" onClick={() => navigate("/homePage")}
                            sx={{"&:hover": {cursor: "pointer", color: "#0c1b33"}}}>
                    AggieFind
                </Typography>
                {isNonMobileScreens && (
                    // Give it a search bar
                    <FlexBetween backgroundColor={blue} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase sx={{ color: "#FFF"}} placeholder="Search" />
                        <IconButton>
                            <Search htmlColor="#FFFF"/>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* Navigation for non-mombile screeens */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <Message htmlColor={blue}  sx={{ fontSize: "25px", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <Notifications htmlColor={blue} sx={{ fontSize: "25px ", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <Help htmlColor={blue} sx={{ fontSize: "25px ", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <FormControl variant="standard" value={fullName}>
                        <Select
                        value={fullName}
                        sx={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem",
                            },
                            "& .MuiSelect-select:focus": {
                            backgroundColor: "#f8f9fa",
                            },
                        }}
                        input={<InputBase />}
                        >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogOut())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
                    
            ) : (
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>
            )}
        
        {/* Navigation for mobile screns */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" backgroundColor="#f8f9fa">
                <Box display="flex" justifyContent="flex-end" padding="1rem">
                <IconButton htmlColor={blue} onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Close htmlColor={blue} />
                </IconButton>
                </Box>

                {/* Menu items */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <Message htmlColor={blue} sx={{ fontSize: "25px ", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <Notifications htmlColor={blue} sx={{ fontSize: "25px ", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <Help htmlColor={blue} sx={{ fontSize: "25px ", "&:hover":  {cursor: "pointer", color: "#0c1b33"}}} />
                    <FormControl variant="standard" value={fullName}>
                        <Select htmlColor={blue} input={<InputBase />} value={fullName} sx={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                                color: "white"
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: "#f8f9fa",

                            }
                        }}>
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogOut)}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            </Box>
        )}
        </FlexBetween>
    )
}

export default Navbar;