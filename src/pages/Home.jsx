import { useState } from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';

function Home() {
    const [isSignin, setIsSignin] = useState(false); // Set to false to show Signup first

    const handleToggle = () => {
        setIsSignin(!isSignin);
    }

    return (
        <>
            {isSignin ? <Login /> : <Signup />}
            {isSignin ? 
                <p    >
                    Don’t have an account? <span  onClick={handleToggle} >Sign Up</span>
                </p> : 
                <p onClick={handleToggle}>
                    Already have an account? <span  onClick={handleToggle} >Log In</span>
                </p>
            }
        </>
    );  
}

export default Home;
