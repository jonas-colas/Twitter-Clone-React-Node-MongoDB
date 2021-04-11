import React from 'react'
import loader from './loader.gif'

const BarLeft = ({user, base}) => {

  const {_id, name, lname, email, about, avatar, phone, slug, username} = user

  return (
    <aside className="col col-xl-3 order-xl-1 col-lg-12 order-lg-1 col-12">
      { !avatar ? (
          <div className="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
            <img src={loader} alt="load" width="30" />
          </div>
        ) : (
          <div className="box mb-3 shadow-sm border rounded bg-white profile-box text-center">
            <div className="py-4 px-3 border-bottom">
              <img src={base+avatar} className="img-fluid mt-2 rounded-circle" alt="Responsive" />
              <h5 className="font-weight-bold text-dark mb-1 mt-4">{name+' '+lname}</h5>
              {phone && <p className="mb-0 text-muted">Tel: {phone}</p>}
              <p className="mb-0 text-muted">email: {email}</p>
            </div>
            <div className="d-flex">
              <div className="col-6 border-right p-3">
                <h6 className="font-weight-bold text-dark mb-1">358</h6>
                <p className="mb-0 text-black-50 small">Connections</p>
              </div>
              <div className="col-6 p-3">
                <h6 className="font-weight-bold text-dark mb-1">85</h6>
                <p className="mb-0 text-black-50 small">Views</p>
              </div>
            </div>
          </div>
        )
      }
    </aside>
    
  )
}

export default BarLeft
