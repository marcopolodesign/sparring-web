import React, { useState, useEffect } from 'react';
import { Button, Drawer, Spin } from 'antd';
import { createUser } from '../api/functions';

export default function Modal({ loading, setOpen, open }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: 'sparring123',
    email: '',
    firstName: '',
    lastName: '',
    document: '',
    phone: '',
    attributes: [{ utm_source: 'website-beta' }]
  });

  // Define input fields to be mapped dynamically
  const inputFields = [
    { label: 'Mail', name: 'email', type: 'email', placeholder: 'Correo electrónico', required: true },
    { label: 'Nombre', name: 'firstName', type: 'text', placeholder: 'Nombre', required: true },
    { label: 'Apellido', name: 'lastName', type: 'text', placeholder: 'Apellido', required: true },
    { label: 'DNI', name: 'document', type: 'text', placeholder: 'DNI', required: true },
    { label: 'Teléfono', name: 'phone', type: 'tel', placeholder: 'Teléfono', required: true },
  ];

  // Handle form input change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Auto-generate the username when first and last name change
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      username: `${prevData.firstName}${prevData.lastName}`,
    }));
  }, [userData.firstName, userData.lastName]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading spinner
    try {
      const response = await createUser(userData); // Call createUser function
      console.log('User created successfully:', response);
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false); // Hide loading spinner
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      closable
      destroyOnClose
      placement="right"
      className="!bg-blue !smooth-t-long custom-drawer"
      width={window.innerWidth < 768 ? '100%' : '40%'}
      open={open}
      onClose={onClose}
      closeIcon={<Button type="text" onClick={onClose} className="text-white hover:!text-lightGreen">Cerrar</Button>}
    >
      <div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Dynamically map over input fields */}
          {inputFields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-bold mb-2 font-body text-white" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={userData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="w-full p-3 border rounded-md font-body"
              />
            </div>
          ))}

          {/* Submit button with loading spinner */}
          <div className="flex justify-between items-center">
            <Button
              type="primary"
              htmlType="submit"
              className="p-6 bg-darkGreen rounded-lg font-display uppercase text-4xl w-full leading-none text-lightGreen flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spin size="small" /> : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}