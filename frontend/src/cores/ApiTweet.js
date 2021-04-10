const API = process.env.REACT_APP_API_URL;

export const createPost = (userId, token, newData) => {
  return fetch(`${API}/tweets/create/${userId}`, {
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newData)
  })
  .then(response => {
    return response.json();
  })
  .catch(error => console.log(error));
};

export const readPosts = () => {
  return fetch(`${API}/tweets/read`, {
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

export const deletePost = (userId, token, postId) => {
  return fetch(`${API}/tweets/destroy/${userId}/${postId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })  
  .then(resp => {return resp.json()})
  .catch(error => { console.log(error) });
};


