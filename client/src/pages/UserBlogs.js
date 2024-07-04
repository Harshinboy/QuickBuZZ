import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => {
          const createdAt = new Date(blog.createdAt);
          const dateOnly = createdAt.toISOString().split('T')[0];
          return (
            <BlogCard
              key={blog._id} // add a unique key prop when rendering lists
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={dateOnly} // use dateOnly if you want to show only the date
            />
          );
        })
      ) : (
        <h1>You Have No Posts - Create a BuZZ</h1>
      )}
    </div>
  );
  
};

export default UserBlogs;
