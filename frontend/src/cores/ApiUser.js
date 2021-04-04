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

export const login = (userData) => {
  return fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })  
  .then(resp => {return resp.json()})
  .catch(err => console.log(err));
};

export const auth = (userData, next) => {
  if(typeof window === 'undefined'){
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