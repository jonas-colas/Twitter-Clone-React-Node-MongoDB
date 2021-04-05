import React, {useState, useEffect} from 'react'
import {isAuth, getUser} from '../../cores/ApiUser'


const Aside = () => {
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
  
  const {_id, name, lname, username, avatar, cover, slug} = userInfo

  useEffect(() => {
    getData()
  }, [])

  return (
    <aside className="col-md-4">
      <div className="mb-3 border rounded bg-white profile-box text-center w-10">
        <div className="p-4 d-flex align-items-center">
          <img src={base+avatar} className="img-fluid rounded-circle" alt="Responsive image" />
          <div className="p-4">
            <label data-toggle="tooltip" data-placement="top" data-original-title="Upload New Picture"
             className="btn btn-info m-0" htmlFor="fileAttachmentBtn">
              <i className="feather-image" />
              <input id="fileAttachmentBtn" name="file-attachment" type="file" className="d-none" />
            </label>
          </div>
        </div>
      </div>
      <div className="border rounded bg-white mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Sobre mi</h6>
          <p className="mb-0 mt-0 small">Tell about yourself in two sentences. </p>
        </div>
        <div className="box-body">
          <div className="p-3 border-bottom">
            <div className="form-group mb-4">
              <label className="mb-1">BIO</label>
              <div className="position-relative">
                <textarea className="form-control" rows={4} name="text" placeholder="Enter Bio" defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor :)"} />
              </div>
            </div>
          </div>
          <div className="overflow-hidden text-center p-3">
            <a className="font-weight-bold btn btn-light rounded p-3 d-block" type="submit"> Guardar </a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Aside