import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { observer } from "mobx-react";
import navbarstyles from'./navbar.module.css';

const Navbar = observer(() => {
  let location = useLocation();
  const navigate = useNavigate();

  const {store} = useContext(Context);

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

  useEffect(() => {
    null
  }, [store.tokentrigger])

  function removeSuccesLocalStorage() {
    return (
      <Link className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" to="logintwo">
      Upload Note
      </Link>
    )
  }

return (
<div className={navbarstyles.container}>
  <nav
    className="nav-navbar relative flex w-full mx-auto flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-primary lg:py-4">
    <div className="fixed-navbar flex flex-wrap items-center justify-between px-3">
      <div className={navbarstyles.logo}>
        <Link className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" to="/" onClick={() => location.pathname('/')}>
          Notes App v2.0
        </Link>
      </div>
      {
      localStorage.getItem('success') === 'true' && !store.navbartrigger
      ? (
        <ul className="list">
          <li className={navbarstyles.listItem}>
            <span className={navbarstyles.logoutlink}>
            {location.pathname.split('/')[1] === 'upload' ? 
            <Link to={'/'}>
              Home
            </Link> :
            <Link to={'/upload'}>
              Upload
            </Link>}
            </span>
          </li>
          <li className={navbarstyles.listItem} onClick={() => googleLogoutNew()}>
            <span className={navbarstyles.logoutlink}>
              Logout
            </span>
          </li>
        </ul>
      ) : removeSuccesLocalStorage
      (

      )}
      </div>
  </nav>
</div>
  );
})

export default Navbar;
