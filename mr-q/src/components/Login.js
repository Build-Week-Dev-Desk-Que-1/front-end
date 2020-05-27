import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { TicketContext } from '../contexts/TicketContext';

const formSchema = yup.object().shape({
  username: yup.string().min(5, '*a username is required').required('this is req'),
  password: yup.string().min(5, '*a password is required').required('this is req'),
});

const initialFormValues = {
  username: '',
  password: '',
};

const initialFormErrors = {
  username: '',
  password: '',
};

export default function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const { setRole, setUser} = useContext(TicketContext);
  let history = useHistory();

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log(formValues);
    e.preventDefault();
    axiosWithAuth()
      .post('https://devqueapi.herokuapp.com/auth/login', formValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem('user', formValues.username.toString());
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        setUser(localStorage.getItem('user'));
        history.push('/protected');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formValues);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} >
        <h2>Login</h2>
        <br></br>
        <div>
          {formErrors.username}
          {formErrors.password}
        </div>

        <div>
          <label>
            <input
              
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
              placeholder="username"></input>
          </label>
        </div>

        <div>
          <label>
            <input
              
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="password"
              placeholder="password"></input>
          </label>
        </div>

        <div >
          <label>
            <button className="login-button">Login</button>
          </label>
        </div>
      </form>
    </div>
  )
}