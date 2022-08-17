import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';
import Auth from './components/Auth';
import FoodTable from './components/FoodTable';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './service/firebase';

const App: React.FC = () => {

  const user = useSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid
        }))
      } else {
        dispatch(logout())
      }
    })
    return () => {
      unSub()
    }
  }, [dispatch])

  return (
    <>
      {
        user.uid ? (
          <FoodTable />
        ) : (
          <div className="App">
          <Auth />
        </div>
        )
      }
    </>

  );
}

export default App;
