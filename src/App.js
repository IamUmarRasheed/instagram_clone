import Navbar from "./components/Navbar";
import React,{useEffect,createContext,useReducer,useContext} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import { reducer,initialState } from "./reducers/useReducer";
import './App.css'
import CreatePost from "./components/screens/CreatePost";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
console.log("hello state from app",state)
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("this is user from app", user);
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: "USER", payload: parsedUser });
        // navigate("/");
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signin" element={<SignIn />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/CreatePost" element={<CreatePost />} />
    </Routes>
  );
};


function App() {
   const [state,dispatch] = useReducer(reducer,initialState)
  return (
    
     <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
       <Routing/>
      </BrowserRouter>
       </UserContext.Provider>
  
  );
}

export default App;
