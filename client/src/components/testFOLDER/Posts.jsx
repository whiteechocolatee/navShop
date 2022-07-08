import React from "react";

export const Posts = ({ posts }) => {
  return (
    <ul className='list-group mb-2'>
      {posts.map((post, index) => (
        <li className='list-group-item' key={index}>
          <b>{post.id}</b>.{post.body}
        </li>
      ))}
    </ul>
  );
};
