import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Progress from './components/ProgressBar'
import { routes } from './routes'
import { useSelector } from 'react-redux'

import './assets/main.min.css'
import './assets/public.scss'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loading = useSelector( state => state.appReducer.loading );
  
  return (
    <BrowserRouter>
      <div className="App">
        {/* Thanh loading trên đầu trang  */}
        <Progress isAnimating={loading} />
        <Routes>
          {
            routes.map((item,index) => {
              let Layout = item.layout;
              let Page = item.page;
              return (
                <Route key={index} path={item.path} element={<Layout><Page/></Layout>}></Route>
              );
            })
          }
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        />
    </BrowserRouter>
  )
}

export default App
