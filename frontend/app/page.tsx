"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/Blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/Blogs", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      await fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Blog Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="border rounded-lg p-6 mb-10 space-y-4"
      >
        <h2 className="text-2xl font-semibold">
          Create Blog
        </h2>

        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border rounded p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          className="w-full border rounded p-3 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>

      <hr className="mb-8" />

      <h2 className="text-2xl font-semibold mb-6">
        All Blogs
      </h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg p-5 mb-4"
          >
            <h3 className="text-xl font-bold">
              {blog.title}
            </h3>

            <p className="mt-3">
              {blog.content}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </main>
  );
}