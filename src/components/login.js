import React, { useState } from 'react';
import {Box,TextField,Typography,Button} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import axios from 'axios';


const Login=()=>{

    const [isSignup,setIsSignup]=useState(false);

    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    })

    const [show,setShow]=useState(false);

    const [responseData,setResponseData]=useState('');
    const [successMessage,setSuccessMessage]=useState('');

    const handleChange=(event)=>{
       
        const {name,value}=event.target;
        setInputs({...inputs,[name]:value})
        console.log([name]," : ",value)
        
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setShow(true);
        setTimeout(()=>{setShow(false)},7000)

        console.log('isSignup value: ',isSignup);
        if(isSignup)
        {

            const userToSignup=
            {
            name:inputs.name,
            email:inputs.email,
            password:inputs.password
            };

            axios.post("http://localhost:5000/register",userToSignup)
            .then((res)=>{
               localStorage.setItem("user",JSON.stringify(res.data))
               setResponseData(res.data);
               console.log("result.data::",res.data)
               setSuccessMessage("User registered successfully")
            }).catch((error)=>{
               console.log("error::",error)
               setSuccessMessage("");
            })

        }else{

            const userToLogin={
                email:inputs.email,
                password:inputs.password
            };

            axios.post("http://localhost:5000/login",userToLogin)
            .then((res)=>{
                if(res.data.name)
                {
                    localStorage.setItem("user",JSON.stringify(res.data))
                }
                setResponseData(res.data);
                console.log("result.data::",res.data);
                setSuccessMessage("Logged in successfully.")
            }).catch((error)=>{
                console.log("error::",error)
                setSuccessMessage("");
            })
        }
       
    }

    const resetState=()=>{
        setIsSignup(!isSignup)
        setInputs({name:"",email:"",password:""})
    }

 return(
    <React.Fragment>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={"column"} maxWidth={400} alignItems="center" justifyContent={"center"} margin="auto" marginTop={5} padding={3}
          borderRadius={5} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{boxShadow:"10px 10px 20px #ccc"}}}>
            <Typography variant="h2" padding={3} textAlign="center">
                {isSignup ? "Signup" : "Login"}
            </Typography>
            {isSignup && (<TextField name="name" value={inputs.name} onChange={handleChange} margin="normal" type={'text'} variant="outlined" placeholder='Name' required/>)}
            <TextField name="email" value={inputs.email} onChange={handleChange} margin="normal" type={'email'} variant="outlined" placeholder='Email' required/>
            <TextField name="password" value={inputs.password} onChange={handleChange} margin="normal" type={'password'} variant="outlined" placeholder='Password' required/>
            <Button type="submit" endIcon={isSignup ? <HowToRegOutlinedIcon/> : <LoginOutlinedIcon/>} sx={{marginTop: 3, borderRadius:2}} variant="contained" color="warning">
                {isSignup ? "Signup" : "Login"}
            </Button>
            <Button endIcon={isSignup ? <LoginOutlinedIcon/> : <HowToRegOutlinedIcon/>} onClick={resetState} sx={{marginTop: 3, borderRadius:2}} >
                Change to {isSignup ? "Login" : "Signup"}
            </Button>
            {show && (<Box display={"flex"} borderRadius={2} height={"7em"} width={"20em"} backgroundColor="black" color="white">{successMessage} <br/>Entered values: <br/>Name: {responseData ? responseData.name : ''}<br/>Email: {responseData ? responseData.email : ''}</Box>)}
          </Box>
        </form>
    </React.Fragment>
 )
}

export default Login;