import React from 'react'
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import {Redirect } from "react-router-dom";
import image from "../images/btn_google_signin_dark_focus_web.png"
export default function SignIn() {
    const firebase = useFirebase();
    const history = useHistory();
    const auth = useSelector(state => state.firebase.auth)


    const signWIthGoogle=()=>{
        firebase.login({
            provider:'google',
            type:'popup'
        }).then((res)=>{
          

           // history.push("/home")
        })
    }
    const signinCard=()=>{
        return (
            <div className="flex-col card-shadow pd1r">
                    
                <div className="flex-col card-top" onClick={()=>{
                    signWIthGoogle()
                }}>
                    <img src={image}></img>
                </div>



            

            </div>
        )
    }

    return (
        <div className="flex-col width100" style={{height:"80vh" }}>
            <div>
        <h2 className="heading-big">Welcome to money Manager</h2>
        <h2 className="heading-small">please sign in to continue</h2>
        {
          !isLoaded(auth)
          ? <span>Loading...</span>
          : isEmpty(auth)
            // <GoogleButton/> button can be used instead
            ? signinCard()

            : <Redirect
            to={{
              pathname: "/",
              
            }}
          />
        }
      </div>
            
            
        </div>
    )
}
