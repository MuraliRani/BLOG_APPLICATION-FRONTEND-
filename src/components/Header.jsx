import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://blog-application-backend-9vrl.onrender.com/profile', {
          credentials: 'include', // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          // Handle different HTTP error statuses as needed
          if (response.status === 401) {
            console.error('Unauthorized access - maybe user needs to log in');
            setUserInfo(null); // Clear user info on unauthorized access
          } else {
            console.error('Network response was not ok');
          }
          return;
        }

        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchUserProfile();
  }, [setUserInfo]);

  const logout = async () => {
    try {
      const response = await fetch('https://blog-application-backend-9vrl.onrender.com/logout', {
        credentials: 'include',
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Logout failed');
        return;
      }

      setUserInfo(null);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout} href="#!">Logout ({username})</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
