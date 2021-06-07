import React from 'react';
import { useState } from 'react';
import './CreateBlog.scss';

import { createApi } from '../../api';
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const CreateBlog = () => {
  const [blogtitle, setTitle] = useState('');
  const [blogdescription, setDescription] = useState('');
  const [blogcontent, setContent] = useState('');
  // const [blog, setBlog] = useState([]);
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
  const updateContent = (e) => {
    setContent(e.target.value);
  };
  const handleCreate = async (e) => {
    if (!blogtitle || !blogdescription || !blogcontent) {
      toast.dark('Input Fields cannot be empty', {
        position: 'top-right',
        autoClose: 1000,
      });
    } else {
      e.preventDefault();
      const data = await createApi(blogtitle, blogdescription, blogcontent);
      const posts = await data.json();
      // setBlog(posts.blog);
      toast.success('Blog Added');
    }
  };

  return (
    <>
      <nav className="nav">
        <Link to="/dashboard">
          <img
            className="back"
            src="https://img.icons8.com/plasticine/100/000000/circled-left.png"
            title="Back"
          />
        </Link>
      </nav>
      <div className="big">
        <div className="blog">
          <div className="box">
            <input
              placeholder="Enter Title..."
              className="placeholder"
              name="name"
              value={blogtitle}
              onChange={updateTitle}
            />
          </div>
          <div className="box">
            <textarea
              placeholder="Enter Description...."
              className="placeholder"
              value={blogdescription}
              onChange={updateDescription}
              style={{ height: '90px' }}
            />
          </div>
          <div className="box">
            <MDEditor
              textareaProps={{
                placeholder: 'Write Your Blog Here',
              }}
              height={500}
              width={500}
              value={blogcontent}
              onChange={setContent}
            />
          </div>
          <div className="wrap">
            <button onClick={handleCreate} className="button" type="submit">
              Create
            </button>
            <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
