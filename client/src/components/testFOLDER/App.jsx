import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import axios from "axios";

import { Posts } from "./Posts";
import { Pagination } from "./Pagination";

export const Application = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
      );

      setPosts(res.data);
    };

    getPosts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(
    firstPostIndex,
    lastPostIndex,
  );

  const paginate = (pageNumber) =>
    setCurrentPage(pageNumber);

  console.log(currentPage);

  return (
    <div className={`${styles.content} container-fluid`}>
      <h3 className={`m-5 text-primary`}>Hi there</h3>
      <Posts posts={currentPost} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
