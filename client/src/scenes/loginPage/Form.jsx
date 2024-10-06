import { useState } from "react";
import{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import {ReactComponent as WelcomeSVG} from "../../assets/undraw_welcome.svg"
import {ReactComponent as LoginSVG} from "../../assets/undraw_loginpage.svg"

// Validate input in form via required()
const registerSchema = yup.object().shape({
    firstName: yup.string().required("Your first name is required."),
    lastName: yup.string().required("Your last name is required."),
    email: yup.string().email("Invalid email.").required("required"),
    password: yup.string().required("The password is required."),
    picture: yup.string().required("A profile picture is required."),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("required"),
    password: yup.string().required("The password is required."),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery(("min-width:600px"));
    const isLogin = (pageType==="login")
    const isRegister = (pageType==="register")

    const register = async (values, onSubmitProps) => {
    //    Allows us to send form info and image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );

            navigate("/homePage/")
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box gap="30px" gridTemplateColumns="repeat(4, min,ax(0, 1fr)" display="grid"
                    sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4"}}}>
                        {isRegister && (
                            <>
                                <FlexBetween flexDirection="column">
                                    <WelcomeSVG height="180px"/>
                                </FlexBetween>
            
                                <FlexBetween flexDirection="column">
                                    <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName} sx={{ m: "1rem", width: "70%", gridColumn: "span 2" }}/>
                                    
                                    <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName} sx={{ mb: "0.75rem", width: "70%", gridColumn: "span 2" }}/>
                                </FlexBetween>
                                <Box
                                 sx={{
                                    justifyContent: 'center',
                                    alignContent: "center",
                                    width: "60%",
                                    margin: "auto",

                                    height: "auto",
                                    borderRadius: 1,
                                }}
                                border={`1px solid #f8f9fa`}
                                borderRadius="4px"
                                p="0.5rem"
                                >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed #bfbfc0`}
                                        borderRadius="6px"
                                        paddingLeft="5px"
                                        sx={{ width: "95%", height: "5%", "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                        <Typography>Add Picture Here</Typography>
                                        ) : (
                                        <FlexBetween>
                                            <Typography>{values.picture.name}</Typography>
                                            <EditOutlinedIcon />
                                        </FlexBetween>
                                        )}
                                    </Box>
                                    )}
                                </Dropzone>
                                </Box>
                            </>
                        )}
                        {isLogin && (
                            <FlexBetween>
                                <LoginSVG height='180px'/>
                            </FlexBetween>
                        )}
                        <FlexBetween flexDirection="column">
                            <TextField label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{ width: "70%", mt: "0.5rem", mbrl: "1rem", gridColumn: "span 2" }}/>

                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.password} 
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)} 
                                helperText={touched.password && errors.password} 
                                sx={{ mt: "1rem", width: "70%", gridColumn: "span 2" }}/>
                        </FlexBetween>
                    </Box>


                    {/* BUTTONS */}
                    <Box>
                        <FlexBetween flexDirection="column">
                            <Button
                            type="submit" sx={{ fontSize: "1rem", m: "1rem 0", p: "0.5rem", width: "30%", border: "solid 1px #004E64", backgroundColor: "#f8f9fa", color:"#000","&:hover": {color: "#FFF", backgroundColor: "#004E64"}}}>
                                {isLogin ? "Login" : "Register"}
                            </Button>
                            <Typography onClick={() => {
                                setPageType(isLogin ? "register" : "login")
                                resetForm();
                            }} sx={{ textDecoration: "underline", color: "#004E64", "&:hover": { cursor: "pointer"}}}>
                                {isLogin ? "Don't have an account? Register here." : "Already have an account? Sign in."}
                            </Typography>
                        </FlexBetween>
                    </Box>
                    
                </form>
            )}
        </Formik>
    )
}

export default Form;