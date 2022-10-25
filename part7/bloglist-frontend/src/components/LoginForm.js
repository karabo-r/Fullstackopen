import React from "react";
import useNotification from "../hooks/useNotification";
import BlogService from "../services/blogs";

function LoginForm(props) {
  const notification = useNotification();
  const password = props.password;
  const username = props.username;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultToUserLogin = await BlogService.loginUser({
        username: username.value,
        password: password.value,
      });

      //save the users credentials to localstorage
      window.localStorage.setItem(
        "loggedUserToken",
        JSON.stringify(resultToUserLogin)
      );
      // update user
      props.handleSetUser(resultToUserLogin);
    } catch (error) {
      notification.custom(`${error}`);
    }

    password.clear();
    username.clear();
  };

  // useEffect(()=>{

  // },[])
  return (
    <>
      {notification.display && notification.message}
      <h1>Please Login</h1>
      <form onSubmit={handleLogin}>
        <h3>
          username <input {...username} />
        </h3>
        <h3>
          password <input {...password} />
        </h3>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
