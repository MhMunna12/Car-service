import React, {useContext, useState} from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        success:false
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = ()=>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then((result) => {
            //  const {displayName} = result.user;
            //  const signInUser = {displayName};
            const user = result.user;
            const { displayName, email } = user;
            const newUserInfo = { ...loggedInUser };
            newUserInfo.isSignedIn = true;
            newUserInfo.name = displayName;
            newUserInfo.email = email;
             setLoggedInUser(newUserInfo);
             console.log(loggedInUser);
             history.replace(from);   

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    const handleBlur = (event) =>{
        let isFieldValid =true;
        if(event.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
            const isEmailValid = event.target.value.length > 5 ;
            const passwordHasNumber =  /\d{1}/.test(event.target.value)
            isFieldValid = isEmailValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name] =event.target.value;
            setUser(newUserInfo);
      }
    }
    
    const handleSubmit =(event)=>{
        event.preventDefault();
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                    const user = res.user;
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    updateUserInfo(loggedInUser.name);
            })
            .catch(error => {
                const newUserInfo = {...user}
                
                newUserInfo.error = error.message;
                newUserInfo.success=false;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
            });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
            const user = res.user;
            const { displayName, email } = user;
            const newUserInfo = { ...loggedInUser };
            newUserInfo.isSignedIn = true;
            newUserInfo.name = displayName;
            newUserInfo.email = email;
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            })
            .catch((error) => {
              const newUserInfo = {...user}
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
              console.log(error)
            });
          }
    }

    const updateUserInfo = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log("user name updated successfully");
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="">
            <div className="login-container">
                <h3>{newUser?'Create an account':'Login'}</h3>
                <div className="login ">
                <form onSubmit={handleSubmit} className="">
                    {newUser && <input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Your Name" />}
                <br/>
                <input type="text" name="email" onBlur={handleBlur} className="form-control" placeholder="Email" required/>
                    <br/>
                    <input type="password" name="password" onBlur={handleBlur} className="form-control" placeholder="password" required/>
                    <br/>
                    <input  className="submit" type="submit" value={newUser ? 'Sign Up':'Sign In'} />
                    <p>{newUser? "Already":"Don't"} Have An account? <Link onClick={()=> setNewUser(!newUser)} >{newUser ? "Login" : "Create An Account"}</Link></p>
                </form>
                <p style={{color: 'red'}}>{user.error}</p>
                {user.success && <p style={{color: 'green'}}>User {newUser? "Create":'Logged In' } SuccessFully</p>}
                </div>
            </div>
            <div className="text-center google">
                <button onClick={handleGoogleSignIn}>Continue With Google</button>
            </div>
        </div>
        
    );
};

export default Login;