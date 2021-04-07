import React, {Fragment, useState, useEffect} from 'react'
import Header from '../components/Header'
import BarLeft from '../components/BarLeft'
import BarRight from '../components/BarRight'
import {isAuth, getUser} from '../cores/ApiUser'
import {createPost, readPosts} from '../cores/ApiTweet'
import {Toast} from '../components/SweetAlert'

const Home = () => {
  const {user, token} = isAuth()
  const userId = user._id
  const base = "https://achme.s3.amazonaws.com/"
  
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [posted, setPosted]     = useState('')
  const [posts, setPosts]       = useState([])

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

  const getPosts = () => {
    setLoading(true)
    readPosts().then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
      }else{
        setLoading(false)
        setPosts(data)
      }
    })
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!posted) return setError('La publicacíon no puede estar vacía*')
    console.log(posted)
    setLoading(true)
    //createPost()
    //getPosts()
  }

  const getImg = e => {

  }

  const {_id, about, avatar, sku} = user
  //console.log(user)
  
  useEffect(() => {
    getData()
    getPosts()
  }, [])

  return (
    <Fragment>
      <Header />
      
      <div className="py-4">
        <div className="container">
          <div className="row">
            <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
              <div className="box shadow-sm border rounded bg-white mb-3 osahan-share-post">
                <ul className="nav nav-justified border-bottom osahan-line-tab" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" 
                      aria-controls="home" aria-selected="true"><i className="feather-edit" /> Escribir un artículo</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" 
                      aria-controls="profile" aria-selected="false"><i className="feather-image" /> Subir una foto</a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <form onSubmit={handleSubmit}>
                      <div className="p-3 align-items-center w-100" href="#">
                        <div className="w-100">
                          <textarea placeholder="Escribir algo..." className="form-control border-0 p-0 shadow-none" 
                            rows={3} onChange={e => setPosted(e.target.value)} value={posted || ''}  />
                        </div>
                      </div>
                      <div className="border-top p-3 align-items-center mb-4">
                        {error && <small className="text-danger">{error}</small> }
                        <div className="flex-shrink-1">
                          <button type="submit" className="btn btn-primary btn-sm pull-right">Publicar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              {/*Show Posts */}
              <div className="box shadow-sm border rounded bg-white mb-3 osahan-post">
                <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                  <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="/assets/img/p5.png" alt="" />
                    <div className="status-indicator bg-success" />
                  </div>
                  <div className="font-weight-bold">
                    <div className="text-truncate">Tobia Crivellari</div>
                    <div className="small text-gray-500">Product Designer at wrapbootstrap</div>
                  </div>
                  <span className="ml-auto small">3 hours</span>
                </div>
                <div className="p-3 border-bottom osahan-post-body">
                  <p className="mb-0">Tmpo incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco .
                  </p>
                </div>
                <div className="p-3 border-bottom osahan-post-footer">
                  <a href="#" className="mr-3 text-secondary"><i className="feather-heart text-danger" /> 16</a>
                  <a href="#" className="mr-3 text-secondary"><i className="feather-message-square" /> 8</a>
                  <a href="#" className="mr-3 text-secondary"><i className="feather-share-2" /> 2</a>
                </div>
                              
              </div>
              
            </main>

            <BarLeft user={userInfo} base={base} />

            <BarRight user={userInfo} base={base} />

          </div>
        </div>
      </div>
   
    </Fragment>
  )
}

export default Home
