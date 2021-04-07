const API = process.env.REACT_APP_API_URL;

export const createPost = (userData) => {
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

export const readPosts = () => {
  return fetch(`${API}/users/read`, {
    method: 'GET',
  })  
  .then(resp => {return resp.json()})
  .catch(error => {
    console.log(error)
  });
};

export const getOnePost = (userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
  })  
  .then(resp => {return resp.json()})
  .catch(error => {
    console.log(error)
  });
};

export const updatePost = (userId, token, userData) => {
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

export const deletePost = (userId, token, userData) => {
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


