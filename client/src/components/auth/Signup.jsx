import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { signup } from '../../apiCalls/usersApiCalls';
import { DataContext } from '../../store/context';
import { createCart } from '../../apiCalls/cartsApiCalls';
import basq from '../../assets/basq.jpeg';

const Signup = () => {
  const { usersDispatch, isUserLoggedIn, cartsDispatch } =
    useContext(DataContext);

  if (isUserLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signup(usersDispatch, data);
      if (res.statusCode < 400) {
        await createCart(cartsDispatch);
        return navigate('/dashboard');
      }
    } catch (err) {
      console.log('err ->', err);
    }
  };

  return (
    <div className="login">
      <section>
        <div className="left">
          <h1>Hello there,</h1>
          <p>Please sign up to our record store, peace!</p>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="info">
                <div className="row">
                  <div>
                    <input
                      name="firstName"
                      placeholder="First name"
                      defaultValue="test"
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
                      defaultValue="test"
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
                  defaultValue="test100@test.com"
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
                <input
                  name="password"
                  type="password"
                  defaultValue="!Test1234"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Required',
                    minLength: {
                      value: 5,
                      message: 'Password must be at least 5 characters',
                    },
                  })}
                />
                <div className="error-message">
                  {errors.password && <span>{errors.password.message}</span>}
                </div>
              </div>

              <div className="submit">
                <input className="button-bg" type="submit" value="Sign Up" />
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <img src={basq} alt="basq" />
        </div>
      </section>
    </div>
  );
};

export default Signup;
