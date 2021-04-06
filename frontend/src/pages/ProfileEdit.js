import React, {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import Form from '../components/edit/Form'
import {isAuth, getUser} from '../cores/ApiUser'
import Aside from '../components/edit/Aside'
//import Avatar from '../components/edit/Avatar'
//import Cover from '../components/edit/Cover'
import Swal from 'sweetalert2'

const ProfileEdit = () => {
  const {user, token} = isAuth()
  const userId = user._id

  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo] = useState({})

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

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
