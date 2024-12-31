import React, { useEffect, useState } from 'react';
import { setUser, setError, setLoading } from '../redux/User/userSlice';
import {useSelector, useDispatch} from 'react-redux';

const User = () => {
const {user, error, loading} = useSelector(state => state.user);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(setLoading(true));
    fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
        throw response;
    })
    .then((data) => {
        dispatch(setUser(data));
    })
    .catch((error) => {
        dispatch(setError(error));
    })
    .finally(() => {
        dispatch(setLoading(false));
    });
}, []);

if(error) {
    return <div>Error: {error.message}</div>;
}
if(loading) {
    return <div>Loading...</div>;
}

  return (
    <>
      <h1>User Component</h1>
      <h2>Name:{user.name}</h2>
      <h2>Phone:{user.phone}</h2>
    </>
  )
}

export default User
