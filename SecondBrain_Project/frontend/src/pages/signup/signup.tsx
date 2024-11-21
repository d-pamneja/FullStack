import React from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography} from '@mui/material';
import Input from '@/components/shared/input';

const SignUp = () => {
  const {signup} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      await signup(username, password);
      toast.success('Signed Up Successfully', { id: 'signup' });
      const redirect = "/login";
      navigate(redirect);
    } catch (error : any) {
      if(error.status===411){
        return toast.error(`Sign Up Failed: ${error.response.data.message} `, { id: 'signup' });
      }

      else if(error.status===400){
        const errorsArray : string[] = []
        const errors = (error.response.data.details)
        errors.map((err : string)=>{
            console.log(err)
            errorsArray.push(err)
        })
        
        if (errorsArray && errorsArray.length > 0) {
            return toast.error(`Sign Up Failed : ${errorsArray[0]}`, { id: 'signup' });
        } else {
            return toast.error("Sign Up Failed: Unknown error", { id: 'signup' });
        }
      }
    }
  };

  return (
    <Box 
      className='flex w-full md:flex-row flex-col'
      style={{
        background: 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }}
    >
      {/* Right Side - SignUp Form */}
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
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Input type='username' name='username' label='username' fullWidth/>
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
                Sign Up
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SignUp;