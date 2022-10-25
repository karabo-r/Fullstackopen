import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogServices from "./services/blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import useField from "./hooks/useField";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const username = useField("text");
  const password = useField("password");

  const handleSetUser = (credentials) => {
    setUser(credentials);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser("");
  };

  // no login required if there's already a user in localstorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUserToken"));
    if (user) {
      console.log("user found");
      setUser(user);
      BlogServices.getAll(user.token).then((data) => {
        data.forEach((element) => {
          // used for displaying more details
          element.displayState = false;
        });
        // sort blogs by highest likes
        setBlogs(data.sort((a, b) => b.likes - a.likes));
      });
    } else {
      console.log("user not found");
    }
  }, []);

  const hideWhenVisble = { display: visible ? "none" : "" };

  const propsCollection_LoginForm = {
    handleSetUser,
    username,
    password,
  };

  const propsCollection_CreateForm = {
    setVisible,
    user,
    setBlogs,
    blogs,
  };

  const propsCollection_Blog = {
    blogs,
    setBlogs,
    user,
  };

  //username : joey
  //password : password

  return (
    <div>
      {!user ? (
        <LoginForm {...propsCollection_LoginForm} />
      ) : (
        <>
          <h1>blogs</h1>
          <h2>Hello, {user.username}</h2>
          <button onClick={handleLogout}>logout</button> <br />
          <div style={hideWhenVisble}>
            <button onClick={() => setVisible(true)}>new blog</button>
          </div>
          {visible && <CreateForm {...propsCollection_CreateForm} />}
          <Blog {...propsCollection_Blog} />
        </>
      )}
    </div>
  );
};

export default App;
