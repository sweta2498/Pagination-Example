import { createContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ActionType } from './Action_Type';
import './App.css';
import Comment from './Component/Comment';
import Editpost from './Component/EditPost';
import Intersection_Observer from './Component/Intersection_Observer';
import Loginuser from './Component/Loginuser';
import Navbar from './Component/Navbar';
import NewPost from './Component/NewPost';
import Paginate from './Component/Paginate';
import Pagination from './Component/Pagination';
import Pagination_simple from './Component/Pagination_simple';
import Posts from './Component/Posts';
import { GetPostReducer, SetCommentReducer } from './Component/Reducer';
import Updatepost from './Component/Updatepost';
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem('post')) {
      // console.log('if part');
      const post = localStorage.getItem('post')
      dispatchpost({ type: ActionType.SET_GETPOST, payload: JSON.parse(post) })
    }
    else {
      // console.log("else part");
      getpost();
    }
    if (localStorage.getItem("comment")) {
      const comment = localStorage.getItem('comment')
      dispatchcomments({ type: ActionType.ALL_COMMENT, payload: JSON.parse(comment) });
    }
    else {
      getcomments();
    }
    getlogindata();
  }, [])

  const [postdata, dispatchpost] = useReducer(GetPostReducer, [{}]);
  const [commentsdata, dispatchcomments] = useReducer(SetCommentReducer, [{}]);

  function getlogindata() {
    fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/UserData").then((result) => {
      result.json().then((resp) => {
        setUser(resp)
      })
    })
  }

  async function getpost() {
    await fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/post").then((result) => {
      result.json().then((resp) => {
        // setPost(resp)
        localStorage.setItem('post', JSON.stringify(resp));
        const post = localStorage.getItem('post')
        dispatchpost({ type: ActionType.SET_GETPOST, payload: JSON.parse(post) })
      })
    })
  }

  function getcomments() {
    fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/comment").then((result) => {
      result.json().then((resp) => {
        // setComments(resp)
        localStorage.setItem('comment', JSON.stringify(resp));
        dispatchcomments({ type: ActionType.ALL_COMMENT, payload: resp });
      })
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, postdata, dispatchpost, commentsdata, dispatchcomments }}>
          <Navbar />
          <Routes>
            <Route path='/' element={<Loginuser />} />
            <Route path='/newpost' element={<NewPost />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/comment' element={<Comment />} />
            <Route path='/editpost' element={<Editpost />} />
            <Route path='/updatepost/:id' element={<Updatepost />} />
            <Route path='/pagination' element={<Pagination />} />
            <Route path='/pagination_simple' element={<Pagination_simple />} />
            <Route path='/paginate' element={<Paginate />} />
            <Route path='/intersection' element={<Intersection_Observer />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App;

