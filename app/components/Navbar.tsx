import { Link, NavLink } from "react-router";
import { useCartStore } from "~/store/cart";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("🏠 Funcionalidade Home\n\nEsta funcionalidade será implementada pelo grupo responsável.");
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("🚪 Funcionalidade Logout\n\nEsta funcionalidade será implementada pelo grupo de Login/Autenticação.");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
        <Link to="/" className="font-semibold text-purple-600 text-sm sm:text-base">
          Time Loja • Carros
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/vitrine"
            className={({ isActive }) =>
              `hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Vitrine
          </NavLink>
          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `relative hover:text-purple-600 transition-colors ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            <span className="hidden sm:inline">Carrinho</span>
            <span className="sm:hidden">🛒</span>
            {count > 0 && (
              <span className="ml-1 sm:ml-2 rounded-full bg-gray-900 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white">
                {count}
              </span>
            )}
          </NavLink>
          
          <div className="h-4 w-px bg-gray-300 hidden sm:block" />
          
          <NavLink
            to="/login"
            className="hover:text-purple-600 transition-colors text-gray-900 text-[10px] sm:text-xs"
            title="Área Administrativa"
          >
            <span className="hidden sm:inline">👤 Admin</span>
            <span className="sm:hidden">👤</span>
          </NavLink>
          
          <button
            onClick={handleHomeClick}
            className="hover:text-purple-600 transition-colors text-gray-900 hidden sm:block"
            title="Home (em desenvolvimento)"
          >
            🏠 Home
          </button>
          
          <button
            onClick={handleLogoutClick}
            className="hover:text-red-600 transition-colors text-gray-900"
            title="Logout (em desenvolvimento)"
          >
            <span className="hidden sm:inline">🚪 Logout</span>
            <span className="sm:inline lg:hidden">🚪</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
