import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    person: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            setMode : (state) => {
                state.mode = state.mode === "light" ? "dark" : "light";
            },
            setLogin: (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
            },
            setLogout: (state) =>{
                state.user = null
                state.token = null
            },
            setFollowing: (state, action) => {
                if (state.user) {
                  state.user.followings = action.payload.followings;
                } else {
                  console.error("user followings non-existent :(");
                }
              },
            setFollowers: (state, action) => {
                if(state.user){
                    state.user.followers = action.payload.followers;
                } else{
                  console.error("user followers non-existent :(");
                }
            },
            setPerson: (state, action) => {
                state.person = action.payload.person;
            },
            setPersonFollowing: (state, action) => {
                if (state.person) {
                  state.person.followings = action.payload.followings;
                } else {
                  console.error("person followings non-existent :(");
                }
              },
            setPersonFollowers: (state, action) => {
                if(state.person){
                    state.person.followers = action.payload.followers;
                } else{
                  console.error("person followers non-existent :(");
                }
            },
            setPosts: (state,action) => {
                state.posts = action.payload.posts;
            },
            setPost: (state, action) => {
                const updatedPosts = state.posts.map((post) => {
                  if (post._id === action.payload.post._id) return action.payload.post;
                  return post;
                });
                state.posts = updatedPosts;
            },
            addPost: (state,action) => {
                 state.posts = [...state.posts, ...action.payload.posts]
            }

        }
})

export const { 
   addPost,
    setMode,
    setLogin,
    setLogout,
    setFollowing,
    setFollowers,
    setPosts,
    setPost,
    setPerson,
    setPersonFollowers,
    setPersonFollowing
} = authSlice.actions;

export default authSlice.reducer