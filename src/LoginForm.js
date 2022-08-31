import './LoginForm.css';
import { useState } from 'react';
import useSWR from 'swr';
import { useEffect } from 'react';
import { isDisabled } from '@testing-library/user-event/dist/utils';


export function LoginForm({setUser, setToken}){

    const initialValues = {
        username: "", 
        password: ""
    };
    const registerInit = {
        username: "",
        firstname: "",
        lastname: "",
        newPassword: ""
    }

    let [loginValues, setLoginValues] = useState(initialValues);
    let [registerValues, setregisterValues] = useState(registerInit);

    let [createIsDisabled, setcreateIsDisabled] = useState(true);

    function handleSignup(e){
        e.preventDefault();

        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/users';
        Http.open("POST", url);
        Http.setRequestHeader("Content-Type", "application/json");
        console.log(registerValues);
        Http.send(JSON.stringify(registerValues));
        
        Http.onreadystatechange = function(){
            if(this.readyState === 4 && this.status===200){
                console.log(Http.responseText);
            }
          
        }
    }

    function handlelogin(e){

        e.preventDefault();

        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/users/get-token';
        Http.open("POST", url);
        Http.setRequestHeader("Content-Type", "application/json");
        Http.send(JSON.stringify(loginValues));
        
        Http.onreadystatechange = function() {
            if(this.readyState === 4 && this.status===200){
                setToken(JSON.parse(Http.responseText)["access_token"]);
                setUser(true);
            }


        }
    }

    useEffect(() => {
        let count = 0;
        for (const [key, value] of Object.entries(registerValues)) {
            //console.log(`${key}: ${value}`);
            
            if(value.length !== 0){
                count++;
                console.log(value.length);
            }
        }
        if(count === 4){
            setcreateIsDisabled(false);
        }
      }, [registerValues]);


    const handleLoginInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
        
        
        setLoginValues({
            ...loginValues,
            [name]: value,
            });

    };

    const handleRegisterInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
        
        
        setregisterValues({
            ...registerValues,
            [name]: value,
        });
    };

   return(
        <div>
            <h2>Create user</h2>
            <form onSubmit={handleSignup} id="signUp">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" onChange={handleRegisterInputChange}/>

                <label htmlFor="firstname">First name: </label>
                <input type="text" name="firstname" onChange={handleRegisterInputChange}/>

                <label htmlFor="lastName">Last name: </label>
                <input type="text" name="lastname" onChange={handleRegisterInputChange}/>

                <label htmlFor="newPassword">Password: </label>
                <input type="password" name="newPassword" onChange={handleRegisterInputChange}/>


                {/* <button type="submit" onClick={() => setUser(true)}>Log in</button> */}
                <input type="submit" value="Submit" disabled={createIsDisabled}></input>
                {createIsDisabled && (<p>Disabled</p>)}
                
            </form>

            <h2>Log in</h2>
            <form onSubmit={handlelogin}>

                <label htmlFor="username">Username: </label>
                <input type="text" name="username"  onChange={handleLoginInputChange}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password"  onChange={handleLoginInputChange}/>

                <input type="submit" value="Submit"></input>
                
            </form>

        </div>
    )
}