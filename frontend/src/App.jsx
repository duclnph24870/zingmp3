import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { routes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
