// import React,{useState,useReducer} from 'react'
import createDataContext from "./createDataContext";
// const BlogContext = React.createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogpost":
      return state.map((blogPost) =>
        blogPost.id === action.payload.id ? action.payload : blogPost
      );
    default:
      return state;
  }
};

// export const BlogProvider = ({children}) => {
//   const [blogPosts,dispatch] = useReducer(blogReducer,[]);

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: "add_blogpost", payload: { title, content } });
    if (callback()) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback()) {
      callback();
    }
  };
};

//   return (
//   <BlogContext.Provider value={{data:blogPosts,addBlogPost}}>
//     {children}
//   </BlogContext.Provider>)
// }

// export default BlogContext;

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: "TEST POST", content: "TEST POST", id: 1 }]
);
