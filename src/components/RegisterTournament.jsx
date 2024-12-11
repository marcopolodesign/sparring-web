import React, { useState, useEffect } from 'react';
import { Button, Drawer, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { createUser, getPlayerLevels, addToTournament, uploadProfilePicture } from '../api/functions';

export default function RegisterTournament({ setOpenRegister, openRegister }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLevels, setIsLoadingLevels] = useState(true);
  const [playerLevels, setPlayerLevels] = useState([]);
  const [userData, setUserData] = useState({
    username: '',
    password: 'sparring123',
    email: '',
    firstName: '',
    lastName: '',
    document: '',
    phone: '',
    attributes: [{ 'utm_source': 'website-beta' }],
    category: '',
    profilePicture: null,
  });
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournament_id');

  // Fetch player levels from Strapi backend
  useEffect(() => {
    const fetchPlayerLevels = async () => {
      try {
        const response = await getPlayerLevels(); // Adjust endpoint as per your Strapi setup
        if (response?.data) {
          setPlayerLevels(response.data); // Set player levels array
        }
      } catch (error) {
        console.error('Error fetching player levels:', error);
      } finally {
        setIsLoadingLevels(false); // Set loading to false
      }
    };
    fetchPlayerLevels();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUserData({ ...userData, profilePicture: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Auto-generate the username when first and last name change
  useEffect(() => {
    setUserData((prevData) => ({
      ...prevData,
      username: `${prevData.firstName}${prevData.lastName}`.replace(/\s+/g, '').toLowerCase(),
    }));
  }, [userData.firstName, userData.lastName]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (key === 'profilePicture' && userData.profilePicture) {
        formData.append('files.profilePicture', userData.profilePicture);
      } else if (key !== 'profilePicture') {
        formData.append(key, userData[key]);
      }
    });

    try {

      console.log(JSON.stringify(userData));
      const response = await createUser(userData);

      console.log(response);

      // if (formData) {
      //   try {
      //     const responseProfile = await uploadProfilePicture(response.user.id, formData);
      //     console.log(responseProfile);
      //   } catch (error) {
      //     console.error('Error uploading profile picture:', error);
      //   }
      // }

      if (tournamentId) {
        await addToTournament(response.user.id, tournamentId);
      }

      alert('User created and added to the tournament successfully!');
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle drawer close
  const onClose = () => {
    setOpenRegister(false);
    setUserData({
      username: '',
      password: 'sparring123',
      email: '',
      firstName: '',
      lastName: '',
      document: '',
      phone: '',
      attributes: [{ utm_source: 'register-tournament' }],
      category: '',
      profilePicture: null,
    });
  };

  return (
    <Drawer
      closable
      destroyOnClose
      placement="right"
      className="custom-drawer"
      width={window.innerWidth < 768 ? '100%' : '40%'}
      open={openRegister}
      onClose={onClose}
      closeIcon={<Button type="text" onClick={onClose}>Cerrar</Button>}
    >
      <div className="container p-6">
        <h1 className="text-2xl font-bold mb-6">Registrate para el torneo</h1>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Nombre"
              value={userData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Apellido"
              value={userData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Document */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="document">DNI</label>
            <input
              type="text"
              id="document"
              name="document"
              placeholder="DNI"
              value={userData.document}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="phone">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Teléfono"
              value={userData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="category">Categoría</label>
            {isLoadingLevels ? (
              <div className="w-full p-3 text-center border rounded-md">
                <Spin /> Cargando categorías...
              </div>
            ) : (
              <select
                id="category"
                name="category"
                value={userData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md"
              >
                <option value="">Seleccione una categoría</option>
                {playerLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.attributes.Category}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Profile Picture */}
          {/* <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="profilePicture">Foto de Perfil</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div> */}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="p-4 bg-blue-500 text-white rounded-md w-full"
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