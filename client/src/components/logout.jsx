import { googleLogout } from '@react-oauth/google';

const clientId = "634163366622-9ticvnb9ht92n3faac9rfrfj7jkqkhau.apps.googleusercontent.com"

function Logout() {
  const onSuccess = () => {
    console.log('Log out successfully');
  }
  
  return (
    <div id='signInButton'>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => googleLogout({ clientId: clientId })}>Logout</button>
    </div>
  )
}

export default Logout;
