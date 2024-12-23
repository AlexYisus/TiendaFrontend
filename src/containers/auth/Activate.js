import Layout from '../../hocs/Layout'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { activate } from '../../redux/actions/auth'
import { Navigate } from 'react-router'

const Activate = ({
  activate,
  loading
}) => {
  const params = useParams()
  const [activated, setActivated] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf-token'); 
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        
      }
    };

    fetchCsrfToken(); 
  }, []);

  const activate_account = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token, csrfToken); 
    setActivated(true);
  }

  if (activated && !loading)
    return <Navigate to='/' />;

  return (
    <Layout>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6">
      {loading ? (
        <div className="mt-12 flex justify-center">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Loading...
          </button>
        </div>
      ) : (
        
        <div className="mt-12 flex justify-center">
           <h1 className="text-4xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-5xl/none text-[#005eff] drop-shadow-lg">
              Activa tu cuenta con el siguiente botón
            </h1>
          <button
            onClick={activate_account}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#005eff] hover:bg-[#005eff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005eff]"
          >
            Activar Cuenta
          </button>
        </div>
      )}
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
  activate
})(Activate)
