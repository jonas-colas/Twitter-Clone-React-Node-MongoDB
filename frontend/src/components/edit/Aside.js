import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {isAuth, getUser, updateFoto, updateStorage} from '../../cores/ApiUser'
import S3 from 'aws-s3'
import {Toast} from '../SweetAlert'
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
    }
    reader.readAsDataURL(file)

    if(img !== null || img !== undefined){
      setShowBut(true)
    }else{
      setShowBut(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(img === null || img === undefined){
      Toast.fire({
        icon: 'error',
        title: 'Agregar una foto de perfil',
      })
      return setError("Agregar una foto de perfil")
    }
    setLoading(true)

    try{
      const stored = await S3Client.uploadFile(img)
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
    <div className="mb-3 border rounded bg-white profile-box text-center w-10">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Upload Perfil</h6>
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
              <button type="submit" 
                className={loading ? "btn btn-primary btn-disabled" : "btn btn-primary btn-block"} >
                {loading ? <i className="fa fa-refresh fa-spin" /> : 'Guardar' }
              </button>
            }
          </div>
        </form>
      </div>
  )
}

export default Aside