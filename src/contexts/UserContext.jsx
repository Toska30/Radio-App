import {createContext, useState, useEffect} from "react"
export const UserContext = createContext();

const UserContextProvider =(props)=>{
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] =useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    getUser();
  }, [])

  const getUser = async () =>{
    let user = await fetch("/api/v1/users/whoami")
    user = await user.json();
    setUser(user)
    return
  }

  const login = async (userInfo)=>{
      let result = await fetch("/api/v1/users/login",{
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      result = await result.json();
      console.log(result)
      getUser()
      return result

  }
   
  const logout = async ()=>{
    await fetch("/api/v1/users/logout")
     getUser()
  }

  const register = async(newUser)=>{
    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    result = await result.json();
    getUser();
    return result;
  }
  
  const values ={
    setUser,
    user,
    getUser,
    login,
    logout,
    register,
    showLogin,
    setShowLogin
  }

  return(
    <UserContext.Provider value ={values}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider