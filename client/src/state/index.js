// State management via Redux toolkit
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // Will be state that is stored in the global state.
    // AKA accessible throughout the global application.
    // mode: "light",
    
    // default initial user data
    user: null,
    token: null,
    posts: [],
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    // Actions, or functions that help modify the global state
    reducers: {
        setLogin: (state, action) => {
            // Send user parameter from action payload to global state
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogOut: (state) => {
            // Reset user session (just like in Flask - session.pop() )  
            state.user = null;
            state.token = null;
        },
        setSavedPosts: (state, action) => {
            if (state.user) {
                state.user.savedPosts = action.payload.savedPosts;
            } else {
                console.error("User saved posts non-existent.")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            // Map through all the posts, add the relevant post to user posts
            const updatedPosts = state.posts.map((post) => {
                // Find user 
                if (post._id === action.payload.post._id)
                {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    }
});

export const {setLogin, setLogOut, setSavedPosts, setPosts, setPost } = authSlice.actions;

export default authSlice.reducer;