import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { signUpUser } from '@/services/api';
import { useAppStore } from '@/store/appStore';

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const login = useAppStore((state) => state.login);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Creating Identity...');
    try {
      const response = await signUpUser(data);
      // Assuming signUpUser returns the same structure as login on success
      // If your backend requires login after signup, adjust logic here
      login(response.user, response.token); 
      toast.success('Identity Established', { id: toastId });
      router.push('/');
    } catch (error) {
      toast.error('Creation Failed. Try again.', { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md relative z-10">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-magenta rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neon-cyan rounded-full blur-[100px] opacity-20"></div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-magenta to-transparent"></div>

          <h1 className="font-orbitron text-3xl text-center mb-2 text-white">New Identity</h1>
          <p className="text-text-secondary text-center mb-8 text-sm font-mono">Register your credentials to the network</p>
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="group">
              <label className="block text-neon-magenta text-xs font-orbitron mb-1 ml-1">USER_ALIAS</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 group-focus-within:text-neon-magenta transition-colors" />
                </div>
                <input 
                  {...register('username', { required: true })} 
                  type="text" 
                  placeholder="Neo" 
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-neon-magenta focus:bg-black/40 text-white placeholder-gray-500 transition-all font-outfit" 
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-neon-magenta text-xs font-orbitron mb-1 ml-1">EMAIL_ADDRESS</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-neon-magenta transition-colors" />
                </div>
                <input 
                  {...register('email', { required: true })} 
                  type="email" 
                  placeholder="neo@matrix.com" 
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-neon-magenta focus:bg-black/40 text-white placeholder-gray-500 transition-all font-outfit" 
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-neon-magenta text-xs font-orbitron mb-1 ml-1">PASSWORD_KEY</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-neon-magenta transition-colors" />
                </div>
                <input 
                  {...register('password', { required: true })} 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-neon-magenta focus:bg-black/40 text-white placeholder-gray-500 transition-all font-outfit" 
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg font-orbitron font-bold tracking-wide bg-neon-magenta text-white hover:bg-white hover:text-neon-magenta hover:shadow-glow-magenta transition-all duration-300 transform hover:-translate-y-1">
              GENERATE ACCOUNT
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400 font-mono bg-[#1a202c]/50 backdrop-blur-sm">OR SIGN UP WITH</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-magenta hover:bg-white/10 hover:text-neon-magenta transition-all duration-300">
              <FaGoogle size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-magenta hover:bg-white/10 hover:text-neon-magenta transition-all duration-300">
              <FaGithub size={20} />
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-gray-400">
            Already exist? <Link href="/auth/signin" className="font-bold text-neon-magenta hover:text-white hover:underline transition-colors">Initialize Session</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;