const API = process.env.REACT_APP_API_URL;

export const registerUser = (userData) => {
  return fetch(`${API}/register`, {
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    return response.json();
  })
  .catch(error => console.log(error));
};

export const loginUser = (userData) => {
  return fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })  
  .then(resp => {return resp.json()})
  .catch(error => {
    console.log(error)
    //return error.json();
  });
};

export const getUser = (userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
  })  
  .then(resp => {return resp.json()})
  .catch(error => {
    console.log(error)
  });
};

export const updateUser = (userId, token, userData) => {
  return fetch(`${API}/user/update/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })  
  .then(resp => {return resp.json()})
  .catch(error => { console.log(error) });
};

export const updateStorage = (user, next) => {
  //console.log(user)
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('jwt')){
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};

export const updatePassword = (userId, token, userData) => {
  return fetch(`${API}/user/password/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })  
  .then(resp => {return resp.json()})
  .catch(error => { console.log(error) });
};

export const updateFoto = async (userId, token, userFoto) => {
	return await fetch(`${API}/user/avatar/update/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({data: userFoto})
	})
	.then(response => {
		return response.json();
	})
	.catch(error => console.log(error));
};

export const updateCover = async (userId, token, userFoto) => {
	return await fetch(`${API}/user/cover/update/${userId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({data: userFoto})
	})
	.then(response => {
		return response.json();
	})
	.catch(error => console.log(error));
};

export const auth = (userData, next) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt', JSON.stringify(userData));
    next();
  }
};

export const isAuth = () => {
  if(typeof window === 'undefined'){
    return false;
  }
  if(localStorage.getItem('jwt')){
    return JSON.parse(localStorage.getItem('jwt'));
  }else{
    return false;
  }
};

export const logout = (next) => {
  if(typeof window !== 'undefined'){
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/logout`, {
      method: 'GET',
    })
    .then(resp => {console.log("Cerraste tu session con exito!")})
    .catch(error => console.log(error));
  }
}