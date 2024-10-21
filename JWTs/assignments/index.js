const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { z } = require('zod');


const emailSchema = z
      .string()
      .min(1)
      .email('This is not a valid email.')

const passwordSchema = z
      .string()
      .min(6)


function signJwt(username, password) {
  const userResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);
  if(!userResponse.success || !passwordResponse.success){
    return null
  }
  else{
    const token = jwt.sign({username},jwtPassword)
    return token
  }
}

function verifyJwt(token) { // Here, if jwt.verify is not able to verify the token, it will throw an error, so we will have to manage this using try catch blocks
  try{
    jwt.verify(token,jwtPassword) 
    return true; // So, if the above does not throw an exception, means it has correctly verfied the token, and hence we can straight away return true
  }
  catch(err){
    return false;
  }  
}

function decodeJwt(token) {
  const decodedToken = jwt.decode(token)
  if(decodedToken){
    return true;
  }
  else{
    return false;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
