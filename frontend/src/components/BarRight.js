import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import loaderSmall from './loaderSmall.gif'
import {readUsers} from '../cores/ApiUser'


const BarRight = ({user, base}) => {
  
  const [all, setAll]         = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const {_id, name, lname, email, about, avatar, phone, slug, username} = user
  
  const getAllUser = () => {
    setLoading(true)
    readUsers().then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
      }else{
        setLoading(false)
        setAll(data)
      }
    })
  }

  // console.log(all)

  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-6 col-12">
      <Fragment>
      { !all ? (
          <div><img src={loaderSmall} alt="load" width="100%" /></div>
        ) : (
            <div className="box shadow-sm border rounded bg-white mb-3">
              <div className="box-title border-bottom p-3">
                <h6 className="m-0">People you might know</h6>
              </div>
              <div className="box-body p-3">
                {all.map((u, i) => (
                  <div className="d-flex align-items-center osahan-post-header mb-3 people-list" key={i}>
                    <div className="dropdown-list-image mr-3">
                      <Link to={`profile/${u.slug}`}>
                        <img className="rounded-circle" src={base+u.avatar} alt={u.name} />
                        <div className="status-indicator bg-success" />
                      </Link>
                    </div>
                    <div className="font-weight-bold mr-2">
                      <Link to={`profile/${u.slug}`}>
                        <div className="text-truncate">{u.name+' '+u.lname}</div>
                      </Link>
                    </div>
                    <span className="ml-auto">
                      <button type="button" className="btn btn-primary btn-sm">
                        <i className="feather-user-plus" /> 
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </Fragment>
    </aside>
  )
}

export default BarRight
