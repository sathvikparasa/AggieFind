import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ReactComponent as LoginSVG } from '../../assets/undraw_loginpage.svg';
import { ReactComponent as LoginSVG_2 } from '../../assets/undraw_loginSVG.svg';
import FlexBetween from "components/FlexBetween";
import Form from "./Form";

const LoginPage = () =>
    {
        const blue = '#004E64'
        const theme = useTheme();
        const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
        return (
            <Box>
                
                <Box width="100%" mt="2rem" p="1rem %6" textAlign="center">
                    <Typography fontWeight="bold" fontSize="32px" color={blue}>AggieFind</Typography>
                    <Typography textAlign="center" color={blue} fontWeight="500" variant="h5" sx={{ pt: "0.5rem" }}>A lost and found hub for UC Davis students.</Typography>
                </Box>

                <Box pb="2rem" p="1rem" m="2rem auto" borderRadius="1.5rem" backgroundColor="#f8f9fa"
                    width={isNonMobileScreens ? "30%" : "50%"}>
                    
                    {/* <Typography textAlign="center" color={blue} sx={{ pt: "1.5rem"}} fontWeight={500} variant="h3">Register</Typography> */}
                    <Form />
                </Box>

            </Box>
        )
    }
    
    export default LoginPage;