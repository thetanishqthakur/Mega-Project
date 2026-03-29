import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    // Main Wrapper with subtle purple background tint
    <div className="min-h-screen bg-purple-50/30 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* LEFT COLUMN - Main Content */}
          <div className="lg:w-2/3 bg-white p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(147,51,234,0.06)] border border-purple-100/50">
            <div className="mb-8 border-b border-purple-100 pb-4">
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                {post ? (
                  <span className="text-purple-600">✨ Edit Masterpiece</span>
                ) : (
                  <span className="text-purple-600">✍️ Create New Post</span>
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Unleash your creativity and share it with the world.
              </p>
            </div>

            <div className="space-y-6">
              <Input
                label="Post Title"
                placeholder="Give your thoughts a striking name..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50"
                {...register("title", { required: true })}
              />
              <Input
                label="URL Slug"
                placeholder="auto-generated-slug"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50 text-purple-600 font-mono text-sm"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <div className="mt-4 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all shadow-sm">
                <RTE
                  label="Content"
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar Settings */}
          <div className="lg:w-1/3 bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(147,51,234,0.06)] border border-purple-100/50 h-fit flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-800 border-b border-purple-100 pb-3">
              Publishing Details
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Cover Image
              </label>
              <Input
                type="file"
                className="w-full px-4 py-3 rounded-xl border border-dashed border-purple-300 bg-purple-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 transition-all cursor-pointer text-gray-600"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
            </div>

            {/* Premium Image Preview */}
            {post && post.featuredImage && (
              <div className="w-full relative group rounded-2xl overflow-hidden shadow-md border-2 border-purple-100">
                <img
                  src={appwriteService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">
                    Current Image
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Visibility Status
              </label>
              <Select
                options={["active", "inactive"]}
                label=""
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-gray-50/50 text-gray-800 font-medium cursor-pointer"
                {...register("status", { required: true })}
              />
            </div>

            {/* Premium Purplish Submit Button */}
            <Button
              type="submit"
              className="w-full mt-4 py-4 rounded-xl text-lg font-bold text-white shadow-[0_8px_20px_rgb(147,51,234,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgb(147,51,234,0.4)] transition-all duration-300 active:scale-95"
              bgColor={
                post
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }
            >
              {post ? "Update Masterpiece" : "Publish Post 🚀"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );}
