import React, {Fragment} from 'react'
import Header from '../components/Header'
import Aside from '../components/edit/Aside'
import Form from '../components/edit/Form'

const ProfileEdit = () => {

  return (
    <Fragment>
      <Header  />
      <div className="py-4">
        <div className="container">
          <div className="row">
            <Aside />
            <Form />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProfileEdit
