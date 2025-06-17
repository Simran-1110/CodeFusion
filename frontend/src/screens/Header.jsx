import { useContext } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios'

export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
function logoutHandler(e) {
    e.preventDefault();

    axios.get('/users/logout', {}, { withCredentials: true })
        .then((res) => {
            // console.log(res.data);
            localStorage.removeItem('token'); // optional, if you're storing token
            delete axios.defaults.headers.authorization; // cleanup
            setUser(null);
            navigate('/login', { replace: true });
        })
        .catch((error) => {
            console.log('Logout failed:', error.response?.data || error.message);
        });
}

  return (
    <header className="bg-[#0b1d3a] text-white flex justify-between items-center px-6 py-4 shadow">
      <div className="text-2xl font-bold">Code-Fusion</div>
      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.email || 'User'}</span>
        <button
          onClick={logoutHandler}
          className="bg-[#1d3557] hover:bg-[#26466b] px-4 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
