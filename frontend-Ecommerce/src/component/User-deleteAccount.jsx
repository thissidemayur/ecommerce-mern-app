import { Lock, Trash2, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDeleteUserMutation } from '../store/ApiUserFetch.js';
import {  useNavigate } from 'react-router';

export default function DeleteAccount() {
  const { register, handleSubmit, formState: { errors },reset } = useForm({
    defaultValues: {
      password: '',
    },
    mode: 'onBlur',
  });

  const [deleteAccount , {error , isSuccess,isLoading}] = useDeleteUserMutation()

  const navigate =useNavigate()
  const onSubmit = async(data) => {
    const submitData = {
        password:data.password
    }
    await deleteAccount(data.password)
    reset()
    navigate("/")
    

  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white border border-black/20 rounded-xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black/10 rounded-full mb-4">
            <AlertTriangle size={32} className="text-black" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Delete Account</h1>
          <p className="text-black/80 mt-2 text-sm sm:text-base">
            This action is permanent and cannot be undone. Please enter your password to confirm.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Password Field */}
          <div className="flex flex-col">
            <div
              className="flex items-center border border-black rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-black transition-all duration-200"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.currentTarget.querySelector('input').focus();
                }
              }}
            >
              <Lock size={20} className="text-black mr-3 group-focus-within:text-black/80" />
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required to delete your account',
                })}
                placeholder="Enter your password"
                className="w-full bg-transparent text-black placeholder-black/50 focus:outline-none"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-black/80 mt-2">{errors.password.message}</p>
            )}
          </div>

          {/* Warning Message */}
          <div className="bg-white border border-black/20 rounded-md p-4 flex items-start gap-3">
            <Trash2 size={20} className="text-black/80 flex-shrink-0 mt-1" />
            <p className="text-sm text-black/80">
              Deleting your account will remove all your data, including profile information and settings.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                disabled={isLoading}
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors duration-200 focus:ring-2 focus:ring-black focus:outline-none"
            >
              {isLoading ? "Action under progress..." : "Delete Account"}
            </button>
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-200 focus:ring-2 focus:ring-black focus:outline-none"
            >
              Cancel
            </button>
          </div>
          {isSuccess && <p className='bg-green text white'>{isSuccess}</p>}
          {error && <p className='bg-red-500 text-white'>error?.data?.message</p>}
        </form>
      </div>
    </div>
  );
}