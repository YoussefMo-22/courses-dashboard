// src/pages/Register/Register.js
import React, { useState, useContext } from 'react';
import Joi from 'joi';
import main from '../../assets/main.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().label('Username'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
      .required()
      .label('Password')
      .messages({
        'string.pattern.base':
          'Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.',
      }),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedForm = { ...formData, [id]: value };

    setFormData(updatedForm);

    // Validate this specific field
    const fieldSchema = schema.extract(id);
    const { error } = fieldSchema.validate(value);

    setErrors((prev) => ({
      ...prev,
      [id]: error ? error.message : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Log the user in
      login(formData);

      console.log('Form submitted and saved to localStorage:', formData);

      // Redirect to courses page
      navigate('/courses');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50'>
      <div className='container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
        <div className='flex justify-center'>
          <img
            className='w-full max-w-md lg:max-w-xl object-contain'
            src={main}
            alt='Illustration'
          />
        </div>

        <div className='bg-white shadow-2xl rounded-xl p-8 w-full max-w-md mx-auto'>
          <h1 className='text-center text-2xl md:text-4xl lg:text-5xl font-bold mb-10 text-gray-800'>
            Register
          </h1>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label htmlFor='username' className='block text-gray-700 font-semibold mb-1'>
                Username
              </label>
              <input
                type='text'
                id='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Enter username'
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.username
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-gray-700'
                }`}
              />
              {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-1'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter email'
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-gray-700'
                }`}
              />
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-gray-700 font-semibold mb-1'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter password'
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-gray-700'
                }`}
              />
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
            </div>

            <button
              type='submit'
              className='w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition'
            >
              Register
            </button>
          </form>
          <p className='text-center mt-3 text-sm'>
            Already have an account?{' '}
            <Link className='font-semibold text-gray-900' to='/'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
