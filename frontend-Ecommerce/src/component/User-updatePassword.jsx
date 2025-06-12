import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useUpdatePasswordMutation } from '../store/ApiUserFetch.js';
import { useNavigate } from 'react-router';

export default function ChangePassword() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    mode: 'onBlur',
  });

  const [updatePassword, { error, isSuccess, isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const payload = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await updatePassword(payload).unwrap();
      reset(); // Clear form after success
      alert('Password updated successfully');
      navigate('/');
    } catch (err) {
      return alert('Error while updating password:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center">Change Password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-black rounded-lg shadow-lg p-6 sm:p-8 space-y-6"
        >
          {/* Form Fields */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div
                className="flex items-center border border-black rounded-md p-2 focus-within:ring-2 focus-within:ring-black transition-all duration-150"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.currentTarget.querySelector('input').focus();
                  }
                }}
              >
                <Lock size={20} className="text-black mr-2 group-focus-within:text-black/80" />
                <input
                  type="password"
                  {...register('oldPassword', { required: 'Old Password is required' })}
                  placeholder="Old Password"
                  className="w-full bg-white text-black placeholder-black/50 focus:outline-none"
                />
              </div>
              {errors.oldPassword && (
                <p className="text-sm text-black/80 mt-1">{errors.oldPassword.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className="flex items-center border border-black rounded-md p-2 focus-within:ring-2 focus-within:ring-black transition-all duration-150"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.currentTarget.querySelector('input').focus();
                  }
                }}
              >
                <Lock size={20} className="text-black mr-2 group-focus-within:text-black/80" />
                <input
                  type="password"
                  {...register('newPassword', {
                    required: 'New Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  placeholder="New Password"
                  className="w-full bg-white text-black placeholder-black/50 focus:outline-none"
                />
              </div>
              {errors.newPassword && (
                <p className="text-sm text-black/80 mt-1">{errors.newPassword.message}</p>
              )}
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-sm text-black/80 bg-white border border-black/50 p-3 rounded-md">
              {error.data?.message || 'Error updating password'}
            </p>
          )}
          {isSuccess && (
            <p className="text-sm text-white bg-black p-3 rounded-md">
              Password updated successfully
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Change Password'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-black/10 hover:text-black/80 transition-colors duration-150 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}