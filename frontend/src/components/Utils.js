import Swal from 'sweetalert2'
//import S3 from 'aws-s3'


export const Toast = Swal.mixin({
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

export const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET, 
  dirName: 'avatar',  
  region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  s3Url: process.env.REACT_APP_AWS_URL,
}

export const configTweet = {
  bucketName: process.env.REACT_APP_AWS_BUCKET, 
  dirName: 'tweet',  
  region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  s3Url: process.env.REACT_APP_AWS_URL,
}