import React, {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import BarLeft from '../components/BarLeft'
import BarRight from '../components/BarRight'
import {isAuth, getUser} from '../cores/ApiUser'

const Profile = () => {
  const {user, token} = isAuth()
  const userId = user._id
  const base = "https://achme.s3.amazonaws.com/"
  
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo] = useState({})

  const getData = () => {
    setLoading(true)
    getUser(userId).then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
      }else{
        setLoading(false)
        setUserInfo(data)
      }
    })
  }  

  const {_id, about, sku} = user
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <Fragment>
      <Header  />

      <div className="py-4">
        <div className="container">
          <div className="row">
            
            <BarLeft user={userInfo} base={base} />

            <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-2 col-md-12 col-sm-12 col-12">
              {/* About me */}
              <div className="box shadow-sm border rounded bg-white mb-3">
                <div className="box-title border-bottom p-3">
                  {sku===true ? <h6 className="m-0">Sobre Nosotros</h6> :
                        <h6 className="m-0">Sobre Mi</h6> }
                </div>
                <div className="box-body p-3">
                  <p>{userInfo.about}</p>
                </div>
              </div>
            </main>

            <BarRight user={userInfo} base={base} />

          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default Profile
