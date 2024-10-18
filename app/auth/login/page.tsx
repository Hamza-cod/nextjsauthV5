import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/auth/login-form'), { ssr: false });

const LoginPage =  () => {
 return ( 
  <LoginForm/>
  );
}
 
export default LoginPage;