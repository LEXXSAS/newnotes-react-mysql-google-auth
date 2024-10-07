import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react';
import { Context } from '../App';

const Loginpagetwo = observer(() => {
  const {store} = useContext(Context);
  const navigate = useNavigate();

  const getAuthGoogle = async() => {
    await fetch(import.meta.env.VITE_GOOGLE_URI_FROM_SERVER, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      store.setErrorLoginMessageDefault()
      if (data.urilink && data.urilink !== '') {
        window.location.href = data.urilink
      }
    })
    .catch(err => {
      store.setErrorLoginMessage(toString(err))
      console.log(err)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      navigate('/upload')
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()
    store.setErrorLoginMessageDefault()
    getAuthGoogle()
  }

  return (
    <div className='loginpage'>
    <div className='login-container'>
    <div className="login-container-sub flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div>
        {store.errorloginmessage !== '' ?
        <div style={{width: '180px', marginBottom: '1rem', overflowWrap: 'anywhere'}}><p className="error text-red-500 text-sm">{store.errorloginmessage}</p></div>
        :
        <div style={{width: '180px', marginBottom: '1rem'}}><p className="error text-red-500 text-sm"></p></div>
        }
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
          Sign in to upload
        </h2>
      </div>
    <div className="form-wrapper mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        <div>
        <button type="submit" className="flex w-full justify-center bg-primary font-semibold py-2 px-4 rounded mt-2 leading-6 text-white hover:bg-primaryhover shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Sign in
        </button>
        </div>
        <div style={{margin: '0'}}>
        <Link className="link" to="/">
          <button type="submit" className="flex w-full justify-center bg-primary font-semibold py-2 px-4 rounded mt-2 leading-6 text-white hover:bg-primaryhover shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Back to Notes
          </button>
          </Link>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Google authentication version 2.0
      </p>
    </div>
  </div>
    </div>
    </div>
  )
})

export default Loginpagetwo;
