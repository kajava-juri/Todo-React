export function LoginForm({setUser}){

   return(
        <div>

            <label htmlFor="username">Username: </label>
            <input type="name" name="username"/>

            <label htmlFor="firstName">First name: </label>
            <input type="name" name="firstName"/>

            <label htmlFor="userPassword">Password: </label>
            <input type="password" name="userPassword"/>

            <label htmlFor="userEmail">E-mail: </label>
            <input type="email" name="userEmail"/>

            <button onClick={() => setUser(true)}>Log in</button>
        </div>
    )
}