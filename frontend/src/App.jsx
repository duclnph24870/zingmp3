import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Progress from './components/ProgressBar'
import { routes } from './routes'
import { useSelector } from 'react-redux'

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
    </BrowserRouter>
  )
}

export default App
