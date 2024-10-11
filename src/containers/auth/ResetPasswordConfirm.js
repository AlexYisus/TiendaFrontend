import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { reset_password_confirm } from '../../redux/actions/auth'
import {Navigate, useParams} from 'react-router'
import { PiSpinner } from "react-icons/pi";
import { toast } from 'sonner'
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function ResetPasswordConfirm({ResetPasswordConfirm, loading}){
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
    window.scrollTo(0, 0);

  }, []);

  const params = useParams()

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  })

  const { 
    new_password,
    re_new_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    const uid = params.uid
    const token = params.token

    reset_password_confirm(uid, token, new_password, re_new_password)
    if (new_password === re_new_password)
      setRequestSent(true);
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (requestSent && !loading)
        return <Navigate to='/' />;

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src=""
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresa tu nueva contraseña</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={e=>onSubmit(e)} className="space-y-6">
            <div>
                  <label
                    htmlFor="new_password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="mt-1 relative">
                    <input
                      name="new_password"
                      value={new_password}
                      onChange={e => onChange(e)}
                      type={showPassword ? "" : "password"}
                      placeholder="************************"
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-xl absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                  </div>
                </div>
              <div>
                  <label
                    htmlFor="re_new_password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="mt-1 relative">
                    <input
                      name="re_new_password"
                      value={re_new_password}
                      onChange={e => onChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="************************"
                      required
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="ml-2 text-xl absolute right-3 top-1/2 -translate-y-1/2">
                      {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
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
                      Cambiar contraseña
                    </button>
                  )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}



 


const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  reset_password_confirm
}) (ResetPasswordConfirm)