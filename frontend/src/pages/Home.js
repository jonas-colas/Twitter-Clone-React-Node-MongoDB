import React, {Fragment, useState, useEffect, useRef} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import Header from '../components/Header'
import BarLeft from '../components/BarLeft'
import BarRight from '../components/BarRight'
import {isAuth, getUser} from '../cores/ApiUser'
import {createPost, readPosts} from '../cores/ApiTweet'
import {Toast, configTweet} from '../components/Utils'
import loaderSmall from '../components/loaderSmall.gif'
import S3 from 'aws-s3'
import Moment from 'moment'


const Home = () => {
  const {user, token} = isAuth()
  const userId = user._id
  const base = "https://achme.s3.amazonaws.com/"
  const imageRef = useRef()
  const history = useHistory()
  const {pathname} = useLocation()
  Moment.locale('es')
  
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [posted, setPosted]     = useState('')
  const [posts, setPosts]       = useState([])
  const [pic, setPic]           = useState()
  const [preview, setPreview]   = useState('')
  const [showImg, setShowImg]   = useState(false)


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

  const getImg = e => {
    imageRef.current.click();
  }

  const picUpload = e => {
    e.preventDefault()
    const reader = new FileReader()
    const file   = e.target.files[0]
    
    reader.onloadend = () => {
      setPreview(reader.result)
      setPic(file)
    }
    reader.readAsDataURL(file)

    if(pic || pic !== undefined){
      setShowImg(true)
    }else{
      setShowImg(false)
    }
  }

  const S3Client = new S3(configTweet);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!posted) return setError('Escribe algo*')
    setLoading(true)
    try{
      if(!pic || pic === undefined || pic === ''){
        const newData = {posted}
        const newPost = await createPost(userId, token, newData)
        setPosted('')
        setError('')
        setLoading(false)
        getPosts()
        history.push(pathname)
      }else{
        const imgTweet = await S3Client.uploadFile(pic)
        const img = imgTweet.location
        const newData = {posted, img}
        const newPost = await createPost(userId, token, newData)
        setPosted('')
        setError('')
        setPic()
        setLoading(false)
        setShowImg(false)
        getPosts()
        history.push(pathname)
      }
    }catch(e){
      setLoading(false)
      setError(e)
    }
  }
  
  const destroyTweet = id => {
    console.log(id)
  }

  const {_id, about, avatar, sku} = user
  
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
                    <a className="nav-link" ></a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <form onSubmit={handleSubmit}>
                      <div className="p-3 align-items-center w-100" href="#">
                        <div className="w-100">
                          <textarea placeholder="Escribir algo..." className="form-control border-0 p-0 shadow-none" 
                            rows={3} onChange={e => setPosted(e.target.value)} value={posted || ''}  />
                          {showImg && <img src={preview} className="img-fluid"  />}
                        </div>
                      </div>
                      <div className="border-top p-3 align-items-center mb-4">
                        {error && <small className="text-danger">{error}</small> }
                        <div className="mr-auto">
                          <input type='file' style={{display: 'none'}} ref={imageRef} 
                            onChange={e => picUpload(e)} />
                          <a type="button" className="text-link small" onClick={getImg}>
                            <i className="feather-image"></i> Subir una foto
                          </a>
                        </div>
                        <div className="flex-shrink-1">
                          {loading ? 
                            <button className="btn btn-primary pull-right ml-2" disabled>
                              <i className="fa fa-refresh fa-spin" />
                            </button>  : 
                            <button type="submit" className="btn btn-primary btn-sm pull-right ml-2">Publicar</button>
                          }
                          {showImg &&
                            <button type="submit" className="btn btn-outline-secondary btn-sm pull-right"
                              onClick={e => (setShowImg(false), setPosted(''))}>
                              Cancelar
                            </button>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
              {loading || !posts ? <div className="shadow-sm border rounded bg-white mb-3 osahan-post">
                  <img src={loaderSmall} alt="load" width="30" />
                </div> : 
                posts?.map((p, i) => (
                  <div className="shadow-sm border rounded bg-white mb-3 osahan-post" key={i}>
                    <div className="p-3 d-flex align-items-center border-bottom osahan-post-header">
                      <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src={base+p.user.avatar} alt="avatar" />
                        <div className="status-indicator bg-success" />
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-truncate">{p.user.name+' '+p.user.lname}</div>
                      </div>
                      <span className="ml-auto small">{Moment(p.createdAt).fromNow()} </span>
                      {userId === p.user._id && 
                        <Fragment>
                          <a className="nav-link" href="#" role="button" data-toggle="dropdown">
                            <span type="button" className="ml-3">&#8942;</span>
                          </a>
                          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow-sm">
                            <a className="dropdown-item d-flex align-items-center" type="button" onClick={e => destroyTweet(p._id)}>
                              <div className="font-weight-bold overflow-hidden">
                                <div className="text-truncate">
                                  <i className="feather-trash-2" /> Eliminar 
                                </div>
                              </div>
                            </a>
                          </div>
                        </Fragment>
                      }
                    </div>
                    <div className="p-3 border-bottom osahan-post-body">
                      <p className="mb-0">{p.post} </p>
                      {p.img && <img src={p.img} className="img-fluid" />}
                    </div>
                    <div className="p-3 border-bottom osahan-post-footer">
                      <a href="#" className="mr-3 text-secondary"><i className="feather-heart text-danger" /> 16</a>
                      <a href="#" className="mr-3 text-secondary"><i className="feather-message-square" /> 8</a>
                    </div>
                  </div>
                )) 
              }
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
