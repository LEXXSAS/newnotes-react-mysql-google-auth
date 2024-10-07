import { GoogleLogin } from '@react-oauth/google';

const clientId = "634163366622-9ticvnb9ht92n3faac9rfrfj7jkqkhau.apps.googleusercontent.com"

function Login() {
  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current res: ', res);
  }

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res);
  }
  
  return (
    <div id='signInButton'>
    <GoogleLogin 
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
    </div>
  )
}

export default Login;
