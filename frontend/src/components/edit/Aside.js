import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {isAuth, getUser, updateFoto, updateStorage} from '../../cores/ApiUser'
import Upload from './Upload'
import S3 from 'aws-s3'
import Swal from 'sweetalert2'
import loaderSmall from '../loaderSmall.gif'


const Aside = () => {
  const {user, token} = isAuth()
  const userId = user._id
  const base = "https://achme.s3.amazonaws.com/"

  const {pathname} = useLocation()
  const history = useHistory()

  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [img, setImg]           = useState('')
  const [preview, setPreview]   = useState({})
  const [showBut, setShowBut]   = useState(false)

  const getData = () => {
    setLoading(true)
    getUser(userId).then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
      }else{
        setLoading(false)
        setUserInfo(data)
        setPreview(base+data.avatar)
      }
    })
  }
  
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

  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET, 
    dirName: 'avatar',  
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    s3Url: process.env.REACT_APP_AWS_URL,
  }

	const S3Client = new S3(config);

  const picUpload = e => {
    e.preventDefault()
    const reader = new FileReader()
    const file   = e.target.files[0]

    reader.onloadend = () => {
      setPreview(reader.result)
      setImg(file)
      setImg({...img, file: file, imagePreviewUrl: reader.result})
    }
    reader.readAsDataURL(file)

    if(img.file !== null || img.file !== undefined){
      setShowBut(true)
    }else{
      setShowBut(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(img.file === null || img.file === undefined){
      Toast.fire({
        icon: 'error',
        title: 'Agregar una foto de perfil',
      })
      return setError("Agregar una foto de perfil")
    }
    setLoading(true)

    try{
    	const stored = await S3Client.uploadFile(img.file)
      //console.log(stored)
      const foto = await updateFoto(userId, token, stored.key)
      const newAv = await updateStorage(foto, () => {})
      Toast.fire({
        icon: 'success',
        title: 'Foto actualizado con Exito!',
      })
			setLoading(false)
      history.push(pathname)
    }catch(e){
    	setLoading(false)
    	setError(e)
    	throw(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <aside className="col-md-4">
      {/*<div className="border rounded bg-white mb-3">
         <Upload /> 
      </div> */}
      
      <div className="mb-3 border rounded bg-white profile-box text-center w-10">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Upload Foto de Perfil</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 d-flex align-items-center">
            {!userInfo.avatar ? (
              <div><img src={loaderSmall} alt="load" width="100%" /></div>
            ) : (
              <img src={preview} className="img-fluid rounded-circle mr-5" alt="image" width={100} />
            )}
            
            <div className="p-4">
              <label data-toggle="tooltip" data-placement="top"
                className="btn btn-info m-0" htmlFor="fileAttachmentBtn">
                <i className="feather-image" /> Upload File
                <input id="fileAttachmentBtn" name="file-attachment" type="file" className="d-none" 
                  onChange={e => picUpload(e)} />
              </label>
            </div>
          </div>
          <div className="overflow-hidden text-center p-3">
            {showBut && 
              <button className="btn btn-primary btn-block" type="submit">
                Guardar 
              </button>
            }
          </div>
        </form>
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