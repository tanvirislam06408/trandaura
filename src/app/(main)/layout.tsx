import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import AiAssistant from "@/components/shared/AiAssistant";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AiAssistant />
    </>
  );
};

export default MainLayout;