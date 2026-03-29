import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 h-full">
        <div className="w-full justify-center mb-4">
          {/* SOLUTION: Pehle check karo ki featuredImage hai ya nahi */}
          {featuredImage ? (
            <img
              src={appwriteService.getFileView(featuredImage)}
              alt={title}
              className="rounded-xl object-cover h-40 w-full"
            />
          ) : (
            // Agar image nahi hai, toh ek khali dabba ya placeholder dikhao
            <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
