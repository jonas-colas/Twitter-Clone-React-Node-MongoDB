import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {isAuth, getUser, updateCover, updateStorage} from '../../cores/ApiUser'
import S3 from 'aws-s3'
import Swal from 'sweetalert2'
import loaderSmall from '../loaderSmall.gif'


const Cover = ({cover, Toast}) => {//
  const {user, token} = isAuth()
  const userId = user._id
  const base = "https://achme.s3.amazonaws.com/"

  const {pathname} = useLocation()
  const history = useHistory()

  const [loadingC, setLoadingC] = useState(false)
  const [errorC, setErrorC]     = useState('')
  const [info, setInfo]         = useState({})
  const [imgC, setImgC]         = useState('')
  const [previewC, setPreviewC] = useState('')
  const [showButC, setShowButC] = useState(false)

  console.log(cover)

  // const getData = () => {
  //   setLoadingC(true)
  //   getUser(userId).then(data => {
  //     if(data.errorC){
  //       setLoadingC(false)
  //       setInfo(data)
  //       setErrorC(data.errorC)
  //     }else{
  //       setLoadingC(false)
  //       setPreviewC(base+data.cover)
  //     }
  //   })
  // }
  
  // const Toast = Swal.mixin({
	//   toast: true,
	//   position: 'top-end',
	//   showConfirmButton: false,
	//   timer: 3000,
	//   timerProgressBar: true,
	//   didOpen: (toast) => {
	//     toast.addEventListener('mouseenter', Swal.stopTimer)
	//     toast.addEventListener('mouseleave', Swal.resumeTimer)
	//   }
	// })

  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET, 
    dirName: 'cover',  
    region: process.env.REACT_APP_AWS_DEFAULT_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    s3Url: process.env.REACT_APP_AWS_URL,
  }

	const S3Client = new S3(config);

  const picUploadC = e => {
    e.preventDefault()
    const reader = new FileReader()
    const file   = e.target.files[0]

    reader.onloadend = () => {
      setPreviewC(reader.result)
      setImgC(file)
    }
    reader.readAsDataURL(file)

    if(imgC !== null || imgC !== undefined){
      setShowButC(true)
    }else{
      setShowButC(false)
    }
  }

  const handleSubmitC = async (e) => {
    e.preventDefault()
    if(imgC === null || imgC === undefined){
      Toast.fire({
        icon: 'error',
        title: 'Agregar una foto de cubierta',
      })
      return setErrorC("Agregar una foto de cubierta")
    }
    setLoadingC(true)

    try{
    	const storedC = await S3Client.uploadFile(imgC)
      //console.log(storedC)
      const fotoC = await updateCover(userId, token, storedC.key)
      Toast.fire({
        icon: 'success',
        title: 'Foto actualizado con Exito!',
      })
			setLoadingC(false)
      history.push(pathname)
    }catch(e){
    	setLoadingC(false)
    	setErrorC(e)
    	throw(e)
    }
  }

  useEffect(() => {
    //if(cover !== undefined){
      setPreviewC(base+cover)
    //}
  }, [])

  return (
    <div className="mb-3 border rounded bg-white profile-box text-center w-10">
      <div className="box-title border-bottom p-3">
        <h6 className="m-0">Upload Foto de Cubierta</h6>
      </div>
      <form onSubmit={handleSubmitC}>
        <div className="p-4 d-flex align-items-center">
          {cover === undefined ? (
            <div><img src={loaderSmall} alt="load" width="100%" /></div>
          ) : (
            <img src={previewC} className="img-fluid rounded-circle mr-5" alt="image" width={100} />
          )}
          <div className="p-4">
            <label data-toggle="tooltip" data-placement="top"
              className="btn btn-info m-0" htmlFor="fileAttachmentBtn">
              <i className="feather-image" /> Upload File
              <input id="fileAttachmentBtn" name="file-attachment" type="file" className="d-none" 
                onChange={e => picUploadC(e)} />
            </label>
          </div>
        </div>
        <div className="overflow-hidden text-center p-3">
          {showButC && 
            <button className="btn btn-primary btn-block" type="submit">
              Guardar 
            </button>
          }
        </div>
      </form>
    </div>
  )
}

export default Cover