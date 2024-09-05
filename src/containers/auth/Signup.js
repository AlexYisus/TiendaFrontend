import Layout from "../../hocs/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signup } from "../../redux/actions/auth";
import { Link } from "react-router-dom";
import { VscEye, VscEyeClosed  } from "react-icons/vsc";

function Signup({ signup }) {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [accountCreated, setAccountCreated] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("formData:", first_name, last_name, email, password, re_password);
    signup(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://electroferreteria.s3.us-east-2.amazonaws.com/MARKETING+CCAJ2-14.png"
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registrate
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Si ya tienes una cuenta,{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Ingresa
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Una vez registrado revisa tu correo electronico
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    name="first_name"
                    value={first_name}
                    onChange={(e) => onChange(e)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido
                </label>
                <div className="mt-1">
                  <input
                    name="last_name"
                    value={last_name}
                    onChange={(e) => onChange(e)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

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
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-xl absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Repite la Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    name="re_password"
                    value={re_password}
                    onChange={(e) => onChange(e)}
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-xl absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                {/*<div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Recuerdame
                    </label>
                    </div>*/}

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
const mapStateToProp = (state) => ({});

export default connect(mapStateToProp, {
  signup,
})(Signup);
