import {observer} from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import FileService from '../services/FileService';
import { Context } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const UploadFile = observer(() => {
  let location = useLocation();

  const {store} = useContext(Context);

  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'upload') {
      document.body.style.padding = '0';
    } else {
      
    }
  }, [location]);

  const googleLogoutNew = async() => {
    await fetch(import.meta.env.VITE_API_URL+'/authtwo/googlelogout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      store.setNavbarTrigger(true)
      console.log('googleLogoutNew => ', data)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      localStorage.removeItem('success')
      navigate('/logintwo')
    })
    .catch(err => {
      console.log(err)
      store.setNavbarTrigger(true)
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      localStorage.removeItem('success')
    })
  }
  const upload = async() => {
    try {
      if (file !== null) {
        store.setSearchLoading(true)
        const formData = new FormData();
        formData.append('file', file);
        const res = await FileService.uploadFile(formData)
        store.setUploadFileName(res.data.filename)
        store.setUploadMessage(res.data.message)
        console.log('res => ', res)
        return res
      } else if (file === null) {
        store.setUploadMessage("No file selected!")
      }
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }

  const handleClick = async(e) => {
    e.preventDefault();
    await upload()
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined && localStorage.getItem('user') === null) {
      navigate('/logintwo')
    }
    else if (localStorage.getItem('access_token') !== null && localStorage.getItem('user') !== null) {
      store.getInfoAndRefresTokensNew()
    }
  }, [])

  useEffect(() => {
    if (store.tokentrigger === true) {
      store.getInfoAndRefresTokensNew()
    }
  }, [store.tokentrigger])
  
  useEffect(() => {
    console.log('%cstore.googleusererror => ', 'color: #ee6f529a',store.googleusererror)
    if (store.googleusererror === 'Authenticated ok!') {
      
    }
    console.log('%cstore.googleuser => ', 'color: #52eec29a', store.googleuser)
    if (store.googleuser === null && store.googleusererror === 'Not authenticated!') {
      googleLogoutNew()
    } else {
      if (store.googleuser !== null) {
        JSON.stringify(localStorage.setItem('user', store.googleuser))
      }
    }
  }, [store.googleuser, store.googleusererror])

  useEffect(() => {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined && store.googleuser === null) {
      const key = "access_token"
      const cookiedata = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
      console.log('cookiedata access_token yes => ', cookiedata !== null)
      if (cookiedata !== null) {
        const token = cookiedata[2]
        localStorage.setItem('access_token', token)
        Cookie.remove('access_token')
        store.setTokenTrigger(true)
      }
    }
  }, [])

  if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
    return null
  }

  return (
    <>
    <div className='upload-file-page'>
      <div className='info-upload-container'>
        
      <h3 id="information" className="font-mono text-gray-700 text-xs mb-0 leading-4">Filename: <br/><span className='leading-5'>{store.uploadfilename}</span></h3>

      <p className="my-4 text-xs font font-mono text-gray-700 leading-4 pb2 mb-1" style={{overflowWrap: "anywhere"}}>Message: <br/><span className='text-xs font-mono text-red-400 leading-6 pb2 mb-1'>{store.uploadmesage}</span></p>

      </div>
      <div className='uploadfile-container'>
      <div>
      <label htmlFor="file"
        className="flex justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000" />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000" />
        </svg>
        Upload
        <input
        type="file"
        name='file'
        id='file'
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      </div>
      <div className="buttons">
        <button type="button" onClick={handleClick} className="flex justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Publish</button>
      </div>
      </div>
    </div>
    </>
  )
})

export default UploadFile
