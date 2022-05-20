import './LoginForm.css';
import { useState } from 'react';
import useSWR from 'swr';


export function LoginForm({setUser, setToken}){

    const initialValues = {
        username: "", 
        password: ""
    };
    let [loginValues, setLoginValues] = useState(initialValues);

    function handleSignup(){

        const Http = new XMLHttpRequest();
        const url='http://demo2.z-bit.ee/users';
        Http.open("POST", url);
        Http.send();
        
        Http.onreadystatechange = (e) => {
          //console.log(Http.responseText)
          console.log(Http.responseText["access_token"])
          //setToken(Http.responseText["access_token"]);
          //setUser(true)
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

    const handleInputChange = (e) => {
        //const name = e.target.name 
        //const value = e.target.value 
        const { name, value } = e.target;
    
        setLoginValues({
          ...loginValues,
          [name]: value,
        });

    };

    const login = {
        username: "jyri.kajava@tptlive.ee", 
        password: "duck123"
    };


    // const fetcher = (url) => fetch(url,
    //     {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(login)
    //     })
    //     .then(res => res.json());
    // var url = 'http://demo2.z-bit.ee/users/get-token';
    // const { data, error } = useSWR(url, fetcher)

    // if (error) console.log("failed to load");
    // if (!data) console.log("loading...");
    // console.log(data)

   return(
        <div>
            <h2>Create user</h2>
            <form onSubmit={handleSignup} id="signUp">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"/>

                <label htmlFor="firstName">First name: </label>
                <input type="text" name="firstName"/>

                <label htmlFor="username">Last name: </label>
                <input type="text" name="username"/>

                <label htmlFor="userPassword">Password: </label>
                <input type="password" name="userPassword"/>


                {/* <button type="submit" onClick={() => setUser(true)}>Log in</button> */}
                <input type="submit" value="Submit"></input>
                
            </form>

            <h2>Log in</h2>
            <form onSubmit={handlelogin}>

                <label htmlFor="username">Username: </label>
                <input type="text" name="username"  onChange={handleInputChange}/>

                <label htmlFor="password">Password: </label>
                <input type="password" name="password"  onChange={handleInputChange}/>

                <input type="submit" value="Submit"></input>
                
            </form>

        </div>
    )
}