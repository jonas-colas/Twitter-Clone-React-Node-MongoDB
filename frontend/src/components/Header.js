import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark osahan-nav-top p-0">
      <div className="container">
        <a className="navbar-brand mr-2" href="index.html"><img src="img/logo.svg" alt="" />
        </a>
        <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control shadow-none border-0" placeholder="Search people, jobs & more..." aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn" type="button">
                <i className="feather-search" />
              </button>
            </div>
          </div>
        </form>
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="feather-search mr-2" />
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow-sm animated--grow-in" aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control border-0 shadow-none" placeholder="Search people, jobs and more..." aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn" type="button">
                      <i className="feather-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="jobs.html"><i className="feather-briefcase mr-2" /><span className="d-none d-lg-inline">Jobs</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="connection.html"><i className="feather-users mr-2" /><span className="d-none d-lg-inline">Connection</span></a>
          </li>
          
          <li className="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="feather-message-square" />
              <span className="badge badge-danger badge-counter">8</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
              <h6 className="dropdown-header">
                Message Center
              </h6>
              <a className="dropdown-item d-flex align-items-center" href="messages.html">
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="img/p1.png" alt="" />
                  <div className="status-indicator bg-success" />
                </div>
                <div className="font-weight-bold overflow-hidden">
                  <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                  <div className="small text-gray-500">Emily Fowler · 58m</div>
                </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="messages.html">Read More Messages</a>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow mx-1 osahan-list-dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="feather-bell" />
              <span className="badge badge-info badge-counter">6</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
              <h6 className="dropdown-header">
                Alerts Center
              </h6>
              <a className="dropdown-item d-flex align-items-center" href="notifications.html">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="feather-download-cloud text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold">A new monthly report is ready to download!</span>
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="notifications.html">
                <div className="mr-3">
                  <div className="icon-circle bg-success">
                    <i className="feather-edit text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="notifications.html">
                <div className="mr-3">
                  <div className="icon-circle bg-warning">
                    <i className="feather-folder text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 2, 2019</div>
                  Spending Alert: We've noticed unusually high spending for your account.
                </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="notifications.html">Show All Alerts</a>
            </div>
          </li>
          <li className="nav-item dropdown no-arrow ml-1 osahan-profile-dropdown">
            <a className="nav-link dropdown-toggle pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="img-profile rounded-circle" src="img/p13.png" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow-sm">
              <div className="p-3 d-flex align-items-center">
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src="img/user.png" alt="" />
                  <div className="status-indicator bg-success" />
                </div>
                <div className="font-weight-bold">
                  <div className="text-truncate">Gurdeep Osahan</div>
                  <div className="small text-gray-500">UI/UX Designer</div>
                </div>
              </div>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="profile.html"><i className="feather-edit mr-1" /> My Account</a>
              <a className="dropdown-item" href="edit-profile.html"><i className="feather-user mr-1" /> Edit Profile</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="sign-in.html"><i className="feather-log-out mr-1" /> Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
