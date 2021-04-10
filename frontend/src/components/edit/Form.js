import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {isAuth, getUser, updateUser, updateStorage} from '../../cores/ApiUser'
import Password from './Password'
import {Toast} from '../Utils'

const Form = () => {
  const {register, handleSubmit, errors} = useForm()
  const history       = useHistory()
  const {pathname}    = useLocation()  
  const {user, token} = isAuth()
  const userId        = user._id

  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [userInfo, setUserInfo]	= useState({
    name:'', lname:'', email:'', phone:'',  about:''
  })

  const {name, lname, email, phone, about} = userInfo

  const getData = () => {
    setLoading(true)
    getUser(userId).then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
      }else{
        setLoading(false)
        setUserInfo({name:data.name, lname:data.lname, email:data.email, phone:data.phone, about:data.about})
      }
    })
  }

  const onSubmit = (userData) => {
    setLoading(true)
    const {name, lname, email, phone, about} = userData
    if(!name || !lname || !email || !phone) {
      setLoading(false)
      return Toast.fire({
        icon: 'error',
        title: 'Todos los campos son obligatorios',
      })
    }

    updateUser(userId, token, userData).then(data => {
      if(data.error){
        setLoading(false)
        setError(data.error)
        Toast.fire({
          icon: 'error',
          title: data.error,
        })
      }else{
        console.log(data)
        updateStorage(data, () => {
          setLoading(false)
          setSuccess(true)
          Toast.fire({
		        icon: 'success',
		        title: 'Perfil actualizado con Exito!',
		      })
        })
        history.push(pathname)
      }
    })
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="col-md-8">
      <div className="border rounded bg-white mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Editar Perfil</h6>
        </div>
        <div className="box-body p-3">
          <form className="js-validate" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-sm-6 mb-2">
                <div className="js-form-message">
                  <label className="form-label">Nombre <span className="text-danger">*</span></label>
                  <div className="form-group">
                    <input type="text" className="form-control" name="name" 
                      value={name || ''} onChange={e => setUserInfo({...userInfo, name: e.target.value})}
                      ref={register({required: "Escribe su nombre*", 
                      minLength:{value:3, message: "Nombre invalido"} })} />
                    {errors.name && (<small className="text-danger"> {errors.name.message} </small>) }
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-2">
                <div className="js-form-message">
                  <label className="form-label">Apellido <span className="text-danger">*</span></label>
                  <div className="form-group">
                    <input type="text" className="form-control" name="lname" 
                      value={lname || ''} onChange={e => setUserInfo({...userInfo, lname: e.target.value})}
                      ref={register({required: "Escribe su Apellido*", 
                      minLength:{value:3, message: "Apellido invalido"} })} />
                    {errors.lname && (<small className="text-danger"> {errors.lname.message} </small>) }
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 mb-2">
                <div className="js-form-message">
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <div className="form-group">
                    <input type="email" className="form-control" name="email" required
                      value={email || ''} onChange={e => setUserInfo({...userInfo, email: e.target.value})}
                      ref={register({required: "Escribe un email valido*" })} />
                    {errors.email && (<small className="text-danger"> {errors.email.message} </small>) }
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-2">
                <div className="js-form-message">
                  <label className="form-label">Whatsapp <span className="text-danger">*</span></label>
                  <div className="form-group">
                    <input type="text" className="form-control" name="phone"
                     value={phone || ''} onChange={e => setUserInfo({...userInfo, phone: e.target.value})}
                     ref={register()} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 mb-2">
                <div className="js-form-message">
                  <label className="form-label">Una Descripcíon Sobre Mi <span className="text-danger">*</span></label>
                  <div className="form-group">
                    <textarea type="text" className="form-control" name="about" rows={5}
                      value={about || ''} onChange={e => setUserInfo({...userInfo, about: e.target.value})}
                      ref={register()} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 text-right">
              <button className="font-weight-bold btn btn-primary rounded p-3"> 
                <i className="fa fa-floppy-o" /> Guardar cambio 
              </button>
            </div>
          </form>
        </div>
      </div>

      <Password />
    </main>
  )
}

export default Form
