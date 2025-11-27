import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle, FaGithub, FaLock, FaEnvelope } from 'react-icons/fa';
import { signInUser } from '@/services/api';
import { useAppStore } from '@/store/appStore';

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const login = useAppStore((state) => state.login);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Accessing Terminal...');
    try {
      const response = await signInUser(data);
      login(response.user, response.access_token); // Ensure your API returns 'access_token'
      toast.success('Access Granted', { id: toastId });
      router.push('/');
    } catch (error) {
      toast.error('Access Denied: Invalid Credentials', { id: toastId });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      {/* Glass Card Container */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Decorative Glow behind the card */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-neon-cyan rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neon-magenta rounded-full blur-[100px] opacity-20"></div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden relative">
          {/* Top Border Gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-cyan to-transparent"></div>

          <h1 className="font-orbitron text-3xl text-center mb-2 text-white">System Login</h1>
          <p className="text-text-secondary text-center mb-8 text-sm font-mono">Enter your credentials to continue</p>
          
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="group">
              <label className="block text-neon-cyan text-xs font-orbitron mb-1 ml-1">EMAIL_ADDRESS</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-neon-cyan transition-colors" />
                </div>
                <input 
                  {...register('email', { required: true })} 
                  type="email" 
                  placeholder="user@example.com" 
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:bg-black/40 text-white placeholder-gray-500 transition-all font-outfit" 
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-neon-cyan text-xs font-orbitron mb-1 ml-1">PASSWORD_KEY</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-neon-cyan transition-colors" />
                </div>
                <input 
                  {...register('password', { required: true })} 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-neon-cyan focus:bg-black/40 text-white placeholder-gray-500 transition-all font-outfit" 
                />
              </div>
            </div>

            <div className="text-right">
              <Link href="#" className="text-xs text-neon-magenta hover:text-white transition-colors font-mono">Forgot Password?</Link>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg font-orbitron font-bold tracking-wide bg-neon-cyan text-dark-navy hover:bg-white hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-1">
              INITIALIZE SESSION
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-gray-400 font-mono bg-[#1a202c]/50 backdrop-blur-sm">OR CONNECT WITH</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan hover:bg-white/10 hover:text-neon-cyan transition-all duration-300">
              <FaGoogle size={20} />
            </button>
            <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan hover:bg-white/10 hover:text-neon-cyan transition-all duration-300">
              <FaGithub size={20} />
            </button>
          </div>

          <p className="text-center mt-8 text-sm text-gray-400">
            New user? <Link href="/auth/signup" className="font-bold text-neon-cyan hover:text-white hover:underline transition-colors">Create Identity</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;