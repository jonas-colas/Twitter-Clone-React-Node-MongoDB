import React, {Fragment} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { isAuth, logout } from '../cores/ApiUser'
import logo from './logo.jpeg'


const Header = () => {
  const {user, token} = isAuth()
  const history = useHistory()
  const base = "https://achme.s3.amazonaws.com/"

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0">
      <div className="container">
        <Link className="navbar-brand mr-2" to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control shadow-none border-0" placeholder="Buscar persona..." />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="feather-search" />
              </button>
            </div>
          </div>
        </form>
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="feather-search mr-2" />
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control border-0 shadow-none" placeholder="Buscar persona..." />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="feather-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          { !isAuth() ? (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  <i className="feather-log-in mr-2" />
                  <span className="d-none d-lg-inline">Ingresar</span>
                </Link>
              </li>    
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  <i className="feather-lock mr-2" />
                  <span className="d-none d-lg-inline">Registrar</span>
                </Link>
              </li>    
            </Fragment>
          ) : (
            <Fragment>
              {/* <li className="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                  <i className="feather-message-square" />
                  <span className="badge badge-danger badge-counter">8</span>
                </a>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
                  <h6 className="dropdown-header">
                    Message Center
                  </h6>
                  <a className="dropdown-item d-flex align-items-center" href="messages.html">
                    <div className="dropdown-list-image mr-3">
                      <img className="rounded-circle" src="/assets/img/p1.png" alt="" />
                      <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold overflow-hidden">
                      <div className="text-truncate">
                        Hi there! I am wondering if you can help me with a problem I've been having.
                      </div>
                      <div className="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                  </a>
                  <a className="dropdown-item text-center small text-gray-500" href="messages.html">Read More Messages</a>
                </div>
              </li> */}
              <li className="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
                <a className="nav-link dropdown-toggle pr-0" href="#" role="button" data-toggle="dropdown">
                {user && <img className="img-profile rounded-circle" src={base+user.avatar} alt="av" />}
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow-sm">
                  <div className="p-3 d-flex align-items-center">
                    <div className="dropdown-list-image mr-3">
                      {user && <img className="rounded-circle" src={base+user.avatar} alt="avat" />}
                      <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                      <div className="text-truncate">{user?.name}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to={"/profile"}>
                    <i className="feather-edit mr-1" /> Mi Cuenta
                  </Link>
                  <Link className="dropdown-item" to={"/profile/edit"}>
                    <i className="feather-user mr-1" /> Editar Perfil
                  </Link>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" style={{cursor: "pointer"}}
                    onClick={() => logout(() => {history.push("/")} )} >
                    <i className="feather-log-out mr-1" /> Salir
                  </a>
                </div>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
