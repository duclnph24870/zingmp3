import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Progress from './components/ProgressBar'
import { routes } from './routes'
import { useDispatch, useSelector } from 'react-redux'

import './assets/main.min.css'
import './assets/public.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'tippy.js/dist/tippy.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalWrapper from './components/ModalWrapper';
import { Suspense, useEffect } from 'react';
import { changeLogin } from './store/actions/userActions';

function App() {
  const { loading,modal,theme } = useSelector( state => state.appReducer );
  const ModalComponent = modal.Component;
  const dispatch = useDispatch();
  // lấy ra giao diện hiện có
  const rootStyle = document.documentElement.style;
  const variableName = Object.keys(theme.styles);
  variableName.forEach(item => {
    rootStyle.setProperty(item,theme.styles[item]);
  });
  // lấy ra token local
  const user = useSelector(state => state.userReducer.user);
  const token = localStorage.getItem('token');
  useEffect(() => {
    dispatch(changeLogin(token));
  },[token]);
  
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
                <Route key={index} path={item.path} element={<Suspense fallback={''}><Layout><Page/></Layout></Suspense>}></Route>
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
        <ModalWrapper isActive={modal.isActive} className='modal'>
          {ModalComponent}
        </ModalWrapper>
    </BrowserRouter>
  )
}

export default App
