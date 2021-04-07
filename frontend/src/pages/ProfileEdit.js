import React, {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import Form from '../components/edit/Form'
import {isAuth, getUser} from '../cores/ApiUser'
import Aside from '../components/edit/Aside'
import {Toast} from '../components/SweetAlert'

const ProfileEdit = () => {
  const {user, token} = isAuth()
  const userId = user._id

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

  useEffect(() => {
    getData()
  }, [])

  return (
    <Fragment>
      <Header  />
      <div className="py-4">
        <div className="container">
          <div className="row">
            
            <aside className="col-md-4">
              <Aside />
              {/*<Cover cover={userInfo.cover} Toast={Toast} /> */}
            </aside>

            <Form />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProfileEdit
