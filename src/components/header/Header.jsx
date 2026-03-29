import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    // UI Change: bg-gray-500 hata kar blur aur white tint lagaya, aur sticky banaya
    <header className="py-3 shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b rounded-2xl border-purple-100 transition-all duration-300">
      <Container>
        {/* UI Change: items-center joda taaki logo aur buttons ek line mein aayen */}
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          {/* UI Change: gap-2 joda taaki buttons aapas mein chipke nahi */}
          <ul className="flex items-center ml-auto gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    // UI Change: inline-bock ki spelling theek ki, aur hover pe purple color diya
                    className="inline-block px-5 py-2 font-medium text-gray-700 duration-200 hover:bg-purple-100 hover:text-purple-700 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
