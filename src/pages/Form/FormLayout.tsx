import Breadcrumb from '../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getSingleUser, updateUser } from '../../store/slices/userSlice';
import { useEffect } from 'react';

const schemaFunactions = (id: any) => {
  let schema: any = {
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
  };
  if (!id) {
    schema.password = yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required');
  }
  return yup.object().shape(schema);
};

const FormLayout = () => {
  const { id } = useParams();
  const SingleUser = useSelector((state: any) => state.user.getsingleUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaFunactions(id)),
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (SingleUser) {
      reset(SingleUser);
    }
  }, [SingleUser, reset]);

  const onSubmit = (data: any) => {
    const newdata = { 
      name : data?.name,
      email:data?.email,
    password :  data?.password
    }
    if(id){
      dispatch(updateUser (id, data, navigate))
      reset({})
    }else{
      console.log(data, "data2222")
      dispatch(createUser(newdata, navigate));
      reset({})
    }
  };

  return (
    <>
      <Breadcrumb pageName= {id ? 'Update User' : 'Add User'} />
      <div className="">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {id ? 'Update User' : 'Add User'}
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={SingleUser?.name}
                  placeholder="Enter your full name"
                  {...register('name')}
                  className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    errors?.name ? 'border-red-500' : ''
                  }`}
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
                )}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={SingleUser?.email}
                  placeholder="Enter your email address"
                  {...register('email')}
                  className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    errors?.email ? 'border-red-500' : ''
                  }`}
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              {!id && (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      errors?.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.password?.message}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              >
                {id ? 'Update' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
