import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
     <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      {/* footer that always shows*/}
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by Pratham
      </div>
    </div>
  );
};

export default AppLayout;