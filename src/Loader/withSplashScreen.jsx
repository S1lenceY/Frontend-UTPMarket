import React, { Component } from "react";

function SplashMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <h1 className="relative w-[max-content] font-sans text-base font-bold text-white">
        Cargando...
      </h1>
      <div className="mt-3 relative flex bg-white rounded-full h-10 w-10 items-center justify-center">
        <div className="h-7 w-7 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
      </div>
    </div>
  );
}


export default function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        // Aquí pon tu solicitud de Api
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      // Mientras verifica tu sesión, esta mostrandote la carga
      if (this.state.loading) return SplashMessage();

      // Sino, te manda directamente al componente
      return <WrappedComponent {...this.props} />;
    }
  };
}
