import LoginForm from "@/features/auth/components/LoginForm";
import RegistrationForm from "@/features/auth/components/RegistrationForm";

const AuthPage = () => {
  return (
    <div className="flex justify-around items-center h-full">
      <RegistrationForm />
      <LoginForm />
    </div>
  );
};

export default AuthPage;
