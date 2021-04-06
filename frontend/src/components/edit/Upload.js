import React, {Fragment, useState} from 'react'

const Upload = () => {
  const prev = "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  const [img, setImg] = useState({
    file:'', imagePreviewUrl: prev, 
  });//active: 'Edit'

  const picUpload = e => {
    e.preventDefault()
    const reader = new FileReader()
    const file   = e.target.files[0]

    reader.onloadend = () => {
      setImg({...img, file: file, imagePreviewUrl: reader.result})
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = e => {
    //const {imagePreviewUrl} = img
  }  

  const {imagePreviewUrl} = img


  return (
    <div>
      <label className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img src={imagePreviewUrl} width={100} height={100} />
        </div>
        <input id="photo-upload" type="file" onChange={e => picUpload(e)}/> 
      </label>
      {/* <input type="file" onChange={e => picUpload(e)} /> */}
      {/* <div className="img-wrap img-upload"> */}
        
        {/* <img src={imagePreviewUrl} width={100} height={100} /> */}
      {/* </div> */}
    </div>
  )
}

export default Upload
