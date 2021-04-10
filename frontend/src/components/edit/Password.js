import React, {Fragment, useState} from 'react'
import {useForm} from 'react-hook-form'
import {isAuth, updatePassword} from '../../cores/ApiUser'
import {Toast} from '../Utils'

const Password = () => {
  const {register, handleSubmit, errors} = useForm()
  const {token, user} = isAuth()
	const userId = user._id

  const [oldPass, setOldPass]         = useState('')
  const [newPass, setNewPass]     		= useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError]       			= useState('')
  const [errorOld, setErrorOld]   		= useState('')
  const [errorNew, setErrorNew]   		= useState('')
  const [errorConf, setErrorConf] 		= useState('')
  const [loading, setLoading]   			= useState(false)
  const [showP, setShowP]             = useState('password')

  const onSubmit = (userData) => {
    if(oldPass === '') return setErrorOld("Ingrese la contraseña anterior")
		if(oldPass.length < 6 ) return setErrorOld("La contraseña debe tener al menos 6 caracteres")
		if(newPass === '') return setErrorNew("Ingrese la nueva contraseña")
		if(newPass.length < 6 ) return setErrorNew("La contraseña debe tener al menos 6 caracteres")
		if(confirmPass === '') return setErrorConf("confirmar la nueva contraseña!")
		if(confirmPass.length < 6 ) return setErrorConf("La contraseña debe tener al menos 6 caracteres")
		if(newPass !== confirmPass) return setError("Las contraseñas no coinciden*")
		else{
			const userPass = {oldPass, newPass}
      //console.log(userData)
      //console.log(userPass)
			setLoading(true)
			updatePassword(userId, token, userPass).then(data => {
				if(data.error){
					setLoading(false)
					setError(data.error)
          Toast.fire({
					  icon: 'error',
					  title: data.error
					})
				}else{
					setError('')
					setLoading(false)
					setOldPass('')
					setNewPass('')
					setConfirmPass('')
					Toast.fire({
					  icon: 'success',
					  title: 'Contraseña actualizada con exito!',
					})
				}
			})
		} 
	}

  return (
    <Fragment>
      <div className="border rounded bg-white mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Cambiar mi contraseña </h6>
        </div>
        <div className="box-body px-3 pt-3 pb-0">
          <form className="js-validate" onSubmit={handleSubmit(onSubmit)} >
          {error && <small className="text-danger">{error} </small>}	
            <div className="row">
              <div className="col-sm-4 ">
                <label className="form-label">Contraseña Actual</label>
                <div className="input-group">
                  <input type={showP} className="form-control" name="old" ref={register()}
                   value={oldPass} onChange={e => (setOldPass(e.target.value), setErrorOld(''))} />
                </div>
                {errorOld && <small className="text-danger">{errorOld} </small>}	
              </div>
              <div className="col-sm-4 ">
                <label className="form-label">Nueva Contraseña</label>
                <div className="input-group">
                  <input type={showP} className="form-control" name="new" ref={register()}
                    value={newPass} onChange={e => (setNewPass(e.target.value), setErrorNew(''))} />
                </div>
                {errorNew && <small className="text-danger">{errorNew} </small>}	
              </div>
              <div className="col-sm-4 ">
                <label className="form-label">Confirmar Contraseña</label>
                <div className="input-group">
                  <input type={showP} className="form-control" name="confir" ref={register()}
                    value={confirmPass} onChange={e => (setConfirmPass(e.target.value), setErrorConf(''))} />
                </div>
                {errorConf && <small className="text-danger">{errorConf} </small>}
              </div>
              <div className="col-sm-4 mt-2">
                <input type="checkbox" className="mt-1" onClick={e => {
                  if(showP === "password"){
                    setShowP('text')
                  } else{ 
                    setShowP('password') 
                  }
                }} />
                <small className="ml-1">Mostrar Contraseña</small>
              </div>
            </div>
            <div className="mt-3 mb-3 text-right">
              <button className="font-weight-bold btn btn-primary rounded p-3" stype="submit"> 
                <i className="fa fa-floppy-o" /> Guardar cambio 
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Password
