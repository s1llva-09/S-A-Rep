import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/** Captura erros de render e mostra uma tela amigável em vez de tela branca. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Erro inesperado na aplicação:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-black text-foreground">Algo deu errado</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Tivemos um problema ao carregar esta página. Tente recarregar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-red-700"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
