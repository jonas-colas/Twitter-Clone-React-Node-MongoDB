import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import GoogleButton from 'react-google-button'
import logoh from '../components/logoh.jpeg'
import {registerUser, auth, isAuth} from '../cores/ApiUser'
import Loader from '../components/Loader'

const Register = () => {
  const {register, handleSubmit, errors} = useForm()

  const {user} = isAuth()

  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(false)
  const [redirectTo, setRedirectTo] = useState(false)
  const [showP, setShowP]           = useState('password')

  const onSubmit = (userData) => {
    
  }
  

  return (
    <div className="bg-white">
        <div className="container">
          <div className="row justify-content-center align-items-center d-flex vh-100">
            <div className="col-md-4 mx-auto">
              <div className="osahan-login py-4">
                <div className="text-center mb-4">
                  <a href="index.html">
                    <img src={logoh} alt="logo-ach" /></a>
                  <h5 className="font-weight-bold mt-3">Unete a ACH</h5>
                  <p className="text-muted">Asociación Civil Haitiana </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-row">
                    <div className="col">
                      <div className="form-group">
                        <label className="mb-1">Nombre</label>
                        <div className="position-relative icon-form-control">
                          <i className="feather-user position-absolute" />
                          <input type="text" className="form-control" 
                          name="name" onChange={e => setError('')} 
                          ref={register({required: "Escribe su nombre*", 
                          minLength: {value:3, message: "Nombre demasiado corto*"} })} />
                        </div>
                        {errors.name && <small className="text-danger">{errors.name.message}</small>}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label className="mb-1">Apellido</label>
                        <div className="position-relative icon-form-control">
                          <i className="feather-user position-absolute" />
                          <input type="text" className="form-control" 
                          name="lname" onChange={e => setError('')} 
                          ref={register({required: "Escribe su apellido*", 
                          minLength: {value:3, message: "Apellido demasiado corto*"} })} />
                        </div>
                        {errors.lname && <small className="text-danger">{errors.lname.message}</small>}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Email</label>
                    <div className="position-relative icon-form-control">
                      <i className="feather-at-sign position-absolute" />
                      <input type="email" className="form-control" 
                      name="email" onChange={e => setError('')} 
                      ref={register({required: "Escribe un email valido*"})} />
                    </div>
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                  </div>
                  <div className="form-group">
                    <label className="mb-1">Contraseña (6 ó mas caracteres)</label>
                    <div className="position-relative icon-form-control">
                      <i className="feather-unlock position-absolute" />
                      <input type={showP} className="form-control" 
                      name="password" onChange={e => setError('')} 
                      ref={register({required:"Contraseña obligatoria*",  
                      minLength: {value:6, message: "La contraseña debe tener al menos 6 caracteres *"}})} />
                    </div>
                    <input type="checkbox" className="mt-1" onClick={e => {
                      if(showP === "password"){
                        setShowP('text')
                      } else{ 
                        setShowP('password') 
                      }
                    }} /> 
                    <small> Mostrar Contraseña</small>
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                  </div>
                  <div className="form-group">
                    <label className="mb-1">
                      Estas De Acuerdo con los <Link to={"/"}>Terminos y Condiciones</Link>
                    </label>
                  </div>
                  <button className="btn btn-primary btn-block text-uppercase" type="submit"> Unirme </button>
                  <div className="text-center mt-3 border-bottom pb-3">
                    <p className="small text-muted">Ó Ingresar con</p>
                    <div className="row">
                      <div className="col-12">
                        <GoogleButton label='Ingresar con Google' style={{width: "100%"}}
                          onClick={() => { console.log('Google button clicked') }} />
                      </div>
                    </div>
                  </div>
                  <div className="py-3 d-flex align-item-center">
                    <Link to={"/forgot-password"}>Olvide mi Contraseña</Link>
                    <span className="ml-auto"> Ya Estas Registrado ? 
                      <Link className="font-weight-bold" to={"/login"}> Ingresar</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register
