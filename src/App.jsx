import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './Components/Redus/Store'



function App() {
  return (
    < >
      <Provider store={store}>
        <div className='h-screen w-screen bg-purple-300 overflow-y-auto overflow-x-hidden' style={{
          backgroundImage: `url('/back1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Provider>
    </>
  )
}

export default App
