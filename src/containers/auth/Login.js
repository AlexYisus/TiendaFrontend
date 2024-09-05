import Layout from "../../hocs/Layout";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { PiSpinner } from "react-icons/pi";
import { toast } from "sonner";
import bg_login from "../../assets/img/bg-login.jpg";

const Login = ({ login, loading, isAuthenticated, loginFail, user, access, refresh, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [activated, setActivated] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await login(email, password);
      if (res?.detail === 'No active account found with the given credentials') {
        setActivated(false);
        toast.error("Las credenciales son incorrectas, intenta nuevamente. 😔");
      } else if (res?.detail) {
        setActivated(false);
        toast.error("Ha ocurrido un error, intenta nuevamente. 😔");
      } else {
        toast.success("Inicio de sesión exitoso. 😊");
        setActivated(true);
      }

    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión, intenta nuevamente. 😔");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (activated && !loading)
    return <Navigate to='/' />;

  return (
    <Layout>
      <div className="w-screen h-screen flex justify-center items-center">
        <img src={bg_login} alt="Banner" className="inset-0 object-cover w-[50vw] h-full brightness-50 -z-10 max-md:hidden" />

        <div className="min-h-full w-[50vw] max-md:w-[90vw] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-16">
          {/* <div className="sm:mx-auto sm:w-full sm:max-w-md"> */}
          <div className="sm:w-full sm:max-w-md">
            {/* <img
              className="h-12 w-auto"
              src="https://electroferreteria.s3.us-east-2.amazonaws.com/MARKETING+CCAJ2-14.png"
              alt=""
            /> */}
            <h2 className="text-left text-4xl font-extrabold text-gray-900">
              Inicia Sesión
            </h2>
            <p className="mt-2 text-left text-base text-gray-600">
              O, Registrate Ahora{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Registrar
              </Link>
            </p>
          </div>

          {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"> */}
          <div className="sm:w-full sm:max-w-md">
            <div className="bg-white py-8 sm:rounded-lg">
              <form onSubmit={(e) => onSubmit(e)} className="space-y-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      type="email"
                      placeholder="Ej:, johndoe@example.com"
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="mt-1 relative">
                    <input
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="xxxExamplePassword123"
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-xl absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div> */}

                  <div className="text-sm">
                    <Link
                      to="/reset_password"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                <div>
                  {loading ? (
                    <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed" disabled>
                      <PiSpinner className="text-2xl animate-spin" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Inicia Sesión
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
  isAuthenticated: state.Auth.isAuthenticated,
  loginFail: state.Auth.loginFail,
  user: state.Auth.user,
  access: state.Auth.access,
  refresh: state.Auth.refresh,
  error: state.Auth.error,
});

export default connect(mapStateToProps, {
  login,
})(Login);
