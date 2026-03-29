import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 🌟 Step 1: Nayi loading state banayi

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => {
        setLoading(false); // 🌟 Step 2: Data aane ke baad loading band kardi
      });
  }, []);

  // 🌟 Step 3: Agar data load ho raha hai, toh Premium Spinner dikhao
  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center min-h-[60vh] font-sans">
        <div className="relative w-20 h-20 mb-6">
          {/* Glowing Premium Spinner */}
          <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-purple-600 animate-spin z-20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-purple-100 z-10"></div>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wider animate-pulse">
          Fetching Masterpieces...
        </h2>
      </div>
    );
  }

  // Agar posts nahi hain YA user logged out hai
  if (posts.length === 0 || !authStatus) {
    return (
      <div className="w-full py-24 flex items-center justify-center font-sans">
        <Container>
          <div className="bg-white max-w-2xl mx-auto rounded-3xl p-10 sm:p-14 text-center shadow-[0_8px_30px_rgb(147,51,234,0.08)] border border-purple-100/50 hover:shadow-[0_15px_40px_rgb(147,51,234,0.12)] transition-shadow duration-300">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Welcome to the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Premium Blog
              </span>
            </h1>
            <p className="text-gray-500 text-lg font-medium">
              Login to read amazing posts, or be the very first to craft a
              masterpiece! ✨
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Agar user logged in hai aur posts mil gayi hain
  return (
    <div className="w-full py-12 font-sans">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Masterpieces
            </span>
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Dive into the newest thoughts, stories, and ideas shared by our
            community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
