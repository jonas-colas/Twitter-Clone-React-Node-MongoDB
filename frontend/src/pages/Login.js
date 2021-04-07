import React, {Fragment, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import GoogleButton from 'react-google-button'
import logoh from '../components/logoh.jpeg'
import {loginUser, auth, isAuth} from '../cores/ApiUser'
import Loader from '../components/Loader'
import Header from '../components/Header'
import {Toast} from '../components/SweetAlert'

const Register = () => {
  const {register, handleSubmit, errors} = useForm()

  const {user} = isAuth()
  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(false)
  const [showP, setShowP]     = useState('password')

  const onSubmit = (userData) => {
    setLoading(true)
    const {email, password} = userData
    if(!email || !password){
      return setError("Todos los campos son obligatorios*")
      setLoading(false)
    } 

    loginUser(userData).then(data => {
      if(data.error){
        setLoading(false)
        Toast.fire({
          icon: 'error',
          title: data.error,
        })
        setError(data.error)
      }else{
        auth(data, () => {
          setLoading(false)
          history.push('/')
        })
      }
    })
  }
  
  const showError = () => {
    error && (
      <div className="text-danger"><i className="fa fa-times-circle" /> {error}</div>
    )
  }

  return (
    <Fragment>
      <Header />
      <div className="bg-white">
        <div className="container">
          <div className="row justify-content-center align-items-center d-flex vh-100">
            <div className="col-md-4 mx-auto">
              <div className="osahan-login py-4">
                <div className="text-center mb-4">
                  <Link to={'/'}><img src={logoh} alt="logo-ach" /></Link>
                  <h5 className="font-weight-bold mt-3">Ingresar a ACH</h5>
                  <p className="text-muted">Asociación Civil Haitiana </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                {showError()}
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
                    <label className="mb-1">Contraseña <small>(6 ó mas caracteres*)</small></label>
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
                    <small> Mostrar Contraseña</small> <br />
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                  </div>
                  { loading ? (
                      <button className="btn btn-primary btn-block text-uppercase btn-disabled" disabled> 
                        <i className="fa fa-refresh fa-spin" />
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-block text-uppercase" type="submit"> Ingrear </button>
                    ) 
                  }
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
                    <span className="ml-auto">¿No estas registrado? 
                      <Link className="font-weight-bold" to={"/register"}> Registrar</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Register
