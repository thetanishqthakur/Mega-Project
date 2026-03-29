import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);

  // Safe way to get userData because of the brackets {userData} issue
  const userData = user?.userData || user;

  useEffect(() => {
    if (!authStatus) {
      navigate("/");
      return;
    }

    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
  }, [slug, navigate, authStatus]);

  // 🌟 DEBUG LOGS: Isse pata chalega ki Buttons kyu nahi dikh rahe
  // Browser mein F12 daba kar Console mein check karna kya print ho raha hai
  console.log("Post UserID:", post?.userId);
  console.log("Logged-in UserID:", userData?.$id);

  // Stronger comparison logic
  const isAuthor =
    post && userData ? String(post.userId) === String(userData.$id) : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="py-12 w-full flex justify-center font-sans">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(147,51,234,0.06)] border border-purple-100/50">
          <div className="relative w-full flex justify-center mb-8 rounded-2xl overflow-hidden bg-purple-50 shadow-inner border border-purple-50">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover max-h-125"
            />

            {/* Author Check with extra safety */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-3 bg-white/40 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white/60">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-linear-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-xl font-bold px-6 py-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  className="bg-rose-500 hover:bg-rose-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-xl font-bold px-6 py-2"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="w-full mb-8 border-b border-purple-100 pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight capitalize leading-tight">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-lg prose-purple max-w-none text-gray-700 font-medium leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  );
}
