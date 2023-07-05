// profile picture -> input
// update information -> firstName, lastName, email

import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/context';
import { updateUser } from '../apiCalls/usersApiCalls';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, usersDispatch } = useContext(DataContext);

  const [avatar, setAvatar] = useState('');

  console.log('avatar ->', avatar.length > 0 && avatar.slice(0, 30));

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(usersDispatch, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onAvatarChange = (e) => {
    const fileSelected = e.target.files[0];
    const fileReader = new FileReader();

    // concert to base64 encoded string
    fileReader.readAsDataURL(fileSelected);

    // wait until file is fully loaded / converted to base64 (once fully loaded the "onloadedend" event below fires)
    fileReader.onloadend = () => {
      setAvatar(fileReader.result);
    };
  };

  const updateAvatar = async () => {
    try {
      const response = await updateUser(usersDispatch, { avatar });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <section>
        <div className="left">
          <h1>Your profile, {user.firstName}</h1>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="info">
                <div className="row">
                  <div>
                    <input
                      name="firstName"
                      placeholder="First name"
                      defaultValue={user.firstName}
                      {...register('firstName', {
                        required: 'Please put your first name.',
                      })}
                    />
                    <div className="error-message">
                      {errors.firstName && (
                        <span>{errors.firstName.message}</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      name="lastName"
                      placeholder="Last name"
                      defaultValue={user.lastName}
                      {...register('lastName', {
                        required: 'Please put your last name.',
                      })}
                    />
                    <div className="error-message">
                      {errors.lastName && (
                        <span>{errors.lastName.message}</span>
                      )}
                    </div>
                  </div>
                </div>
                <input
                  name="email"
                  placeholder="Email"
                  defaultValue={user.email}
                  // disabled
                  {...register('email', {
                    required: 'Please put your email sir.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email is invalid. Please fix',
                    },
                  })}
                />
                <div className="error-message">
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
              </div>

              <div className="submit">
                <input className="button-bg" type="submit" value="Save" />
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <h1>You can update your profile pic here!</h1>
          <div className="avatar-panel">
            <div className="main">
              <img src={avatar} alt="placeholder" />
            </div>
            <div className="upload">
              <input
                type="file"
                accept="image/*"
                name="avatar"
                onChange={onAvatarChange}
              />
            </div>
          </div>
          <div className="submit">
            <input
              type="submit"
              className="button-bg"
              value="Update Avatar"
              onClick={updateAvatar}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
