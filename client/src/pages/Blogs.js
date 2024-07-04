import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {blogs &&
  blogs.map((blog) => {
    const createdAt = new Date(blog.createdAt);
    const dateOnly = createdAt.toISOString().split('T')[0];
    return (
      <BlogCard
        key={blog?._id}
        id={blog?._id}
        isUser={localStorage.getItem("userId") === blog?.user?._id}
        title={blog?.title}
        description={blog?.description}
        image={blog?.image}
        username={blog?.user?.username}
        time={dateOnly}
      />
    );
  })}

    </div>
  );
};

export default Blogs;
