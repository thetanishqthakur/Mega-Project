import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from './components/header/Header';
import { Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false));
  }, []);

return !loading ? (
  // 1. GLOBAL LAYOUT: flex-col banaya taaki ek ke neeche ek aayen, aur background yahan set kiya
  <div className="min-h-screen flex flex-col bg-purple-50/30 font-sans">
    <Header />

    {/* 2. FLEX-GROW MAGIC: Yeh beech ki khali jagah ko bhar lega aur Footer ko neeche dhakel dega */}
    <main className="flex grow">
      <Outlet />
    </main>

    <Footer />
  </div>
) : null;
}

export default App;
