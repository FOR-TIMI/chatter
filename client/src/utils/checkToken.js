import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

function useTokenExpiration() {
  const token = useSelector(state => state.token);
  if (!token) {
    // If there is no token, the token has definitely expired
    return false;
  }
  const decodedToken = jwtDecode(token);
  if (!decodedToken.exp) {
    // If the decoded token does not have an exp claim, the token does not expire
    return false;
  }
  const currentTime = Date.now() / 1000; // Convert current time to Unix time


  return decodedToken.exp > currentTime; // Check if token has expired
}

export default useTokenExpiration;
