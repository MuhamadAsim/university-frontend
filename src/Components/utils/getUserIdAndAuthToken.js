
import {jwtDecode} from 'jwt-decode';

const authToken = localStorage.getItem('accessToken'); 
let decodedToken;
let userId;
if (authToken) {
   decodedToken = jwtDecode(authToken);
   userId = decodedToken._id;    
}

export {authToken,userId}
