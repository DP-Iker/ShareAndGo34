import "./App.css";
import "./i18n";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NavbarComponent } from "./components/NavbarComponent/NavbarComponent";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CarDetailPage } from "./pages/CarDetailPage/CarDetailPage";
import { RegistroPage } from "./pages/RegisterPage/RegisterPage";
import { LoginComponent } from "./components/LoginComponent/LoginComponent";
import { MapPage } from "./pages/MapPage/MapPage";
import Cookies from "js-cookie";
import { useUserStore } from "./hooks/userStore";
import { EditarPerfilPage } from "./pages/EditarPerfilPage/EditarPerfilPage";
import { UserMenuPage } from "./pages/UserMenuPage/UserMenuPage";
import { NoticiaDetailPage } from "./pages/NoticiasDetailPage/NoticiasDetailPage";
import CookiesPage from "./pages/CookiesPage/CookiesPage";
import ScrollToTop from "./components/ScrollToTopComponent/ScrollToTopComponent";
import { VeriUserPage } from "./pages/VeriUserPage/VeriUserPage";
import { ReservasPage } from "./pages/ReservasPage/ReservasPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { PassPage } from "./pages/PassPage/PassPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOptionsPerfil, setShowOptionsPerfil] = useState(false);

  const onClickOptionsPerfil = (): void => {
    if (showOptionsPerfil) {
      setShowOptionsPerfil(false);
    }
  };

  useEffect(() => {
    const token: string | undefined = Cookies.get("sessionToken");

    if (token) {
      useUserStore.getState().setToken(token);
    }
  }, []);

  return (
    <>

      <NavbarComponent onLoginClick={() => setShowLogin(true)} />

      {showLogin && <LoginComponent onClose={() => setShowLogin(false)} />}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={() => setShowLogin(false)}
              onClickOptionsPerfil={onClickOptionsPerfil} modoClaro={false}            />
          }
        />
        <Route path="/register" element={<RegistroPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/carDetail" element={<CarDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/panel" element={<UserMenuPage />} />
        <Route path="/noticia" element={<NoticiaDetailPage />} />
        <Route path="/panel/editar-perfil" element={<EditarPerfilPage />} />
        <Route path="/panel/veri-user" element={<VeriUserPage />} />
        <Route path="/panel/reservas" element={<ReservasPage />} />
        <Route path="/panel/historial" element={<HistorialPage />} />
        <Route path="/panel/pass" element={<PassPage />} />



        <Route path="/cookies" element={<CookiesPage />} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
