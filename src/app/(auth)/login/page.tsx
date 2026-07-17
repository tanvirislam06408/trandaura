import { Suspense } from "react";
import LoginPageClient from "./LoginPageClient";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginPageClient />
    </Suspense>
  );
};

export default LoginPage;
