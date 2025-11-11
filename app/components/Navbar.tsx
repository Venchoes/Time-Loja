import { Link, NavLink } from "react-router";
import { useCartStore } from "~/store/cart";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold text-purple-600">
          Time Loja • Carros
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-purple-600 ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/vitrine"
            className={({ isActive }) =>
              `hover:text-purple-600 ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Vitrine
          </NavLink>
          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `relative hover:text-purple-600 ${isActive ? "text-purple-600" : "text-gray-900"}`
            }
          >
            Carrinho
            {count > 0 && (
              <span className="ml-2 rounded-full bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
