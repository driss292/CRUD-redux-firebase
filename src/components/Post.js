import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../actions/post.action";
import CommentPost from "./CommentPost";
import Delete from "./Delete";

const Post = ({ post, user }) => {
  const [toggle, setToggle] = useState(false);
  const [editMess, setEditMess] = useState(null);
  const dispatch = useDispatch();

  const dateFormater = (date) => {
    let days = Math.floor((new Date() - new Date(date)) / (1000 * 3600 * 24));

    if (days === 0) {
      return "aujourd'hui";
    } else if (days === 1) {
      return "il y a 1 jour";
    } else {
      return `il y a ${days} days  jours`;
    }
  };
  const editing = () => {
    setToggle(!toggle);
  };

  const handleEdit = () => {
    setToggle(false);

    if (editMess) {
      dispatch(
        editPost({
          id: post.id,
          message: editMess,
        })
      );
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>Posté {dateFormater(post.date)}</h5>
        </div>
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={editing}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <Delete postId={post.id} />
          </div>
        )}
      </div>
      {toggle ? (
        <>
          <textarea
            autoFocus
            defaultValue={editMess ? editMess : post.message}
            onChange={(e) => setEditMess(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={handleEdit}>
            Modifier message
          </button>
        </>
      ) : (
        <p>{editMess ? editMess : post.message}</p>
      )}
      <CommentPost post={post} />
    </div>
  );
};

export default Post;
