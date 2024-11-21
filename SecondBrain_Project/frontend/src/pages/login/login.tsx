import React from 'react';
import { Box, Button, Container, Typography} from '@mui/material';
import { IoMdLogIn } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/shared/input';


const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await login(username, password);
      toast.success('Signed In Successfully', { id: 'login' });
      const redirect = "/home";
      navigate(redirect);
    } catch (error : any) {
        if(error.status===411){
        return toast.error(`Login Failed: ${error.response.data.message} `, { id: 'login' });
        }

        else if(error.status===400){
        const errorsArray : string[] = []
        const errors = (error.response.data.details)
        errors.map((err : string)=>{
            console.log(err)
            errorsArray.push(err)
        })
        
        if (errorsArray && errorsArray.length > 0) {
            return toast.error(`Login Failed : ${errorsArray[0]}`, { id: 'login' });
        } else {
            return toast.error("Login Failed: Unknown error", { id: 'login' });
        }
        }
    }
  };


  return (
    <Box 
      className='flex h-[850px] md:flex-row flex-col'
      sx={{
        background: 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        marginBottom: 'auto'
      }}
    >
      {/* Left Side - Content */}
      <Box 
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      />

      {/* Right Side - Login Form */}
      <Box 
        flex={1} 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        padding={4}
      >
        <Container maxWidth="sm">
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            padding={4} 
            boxShadow="0px 10px 30px rgba(0, 0, 0, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="10px"
            sx={{
              backgroundColor: "#0B1F34",
            }}
          >
            <Typography 
              variant='h4' 
              textAlign="center" 
              fontWeight={600}
              color="white"
              marginBottom={2}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Input type='username' name='username' label='Username' fullWidth/>
              <Input type='password' name='password' label='Password' fullWidth/>
              <Button 
                type='submit' 
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: '#00fffc',
                  ':hover': {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                }}
                endIcon={<IoMdLogIn />}
              >
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;