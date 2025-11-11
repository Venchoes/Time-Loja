import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Admin - Backoffice" },
    { name: "description", content: "Painel administrativo" },
  ];
}

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redireciona para login se não estiver autenticado
    // TODO: Verificar se o usuário está autenticado
    const isAuthenticated = false; // Placeholder - será implementado pelo grupo de autenticação

    if (!isAuthenticated) {
      alert("🔒 Acesso restrito!\n\nVocê precisa fazer login como administrador para acessar esta área.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">
            Backoffice - Painel Administrativo
          </h1>
          <p className="text-gray-600 mb-8">
            Área de gerenciamento da loja de carros
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-700 mb-2">Dashboard</h3>
              <p className="text-sm text-gray-500">Em desenvolvimento</p>
            </div>

            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="font-semibold text-gray-700 mb-2">Gerenciar Carros</h3>
              <p className="text-sm text-gray-500">Em desenvolvimento</p>
            </div>

            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-700 mb-2">Usuários</h3>
              <p className="text-sm text-gray-500">Em desenvolvimento</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>ℹ️ Informação</strong><br />
              Esta área administrativa será desenvolvida pelo grupo responsável pelo Login/Backoffice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
