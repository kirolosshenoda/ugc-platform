import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken, logout } from '../slices/authSlice.js'
import { authAPI } from '../services/api-calls.js'
import { RootState } from '../store.js'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const register = useCallback(
    async (email: string, password: string, first_name: string, last_name: string, role: string) => {
      try {
        const { data } = await authAPI.register({
          email,
          password,
          first_name,
          last_name,
          role,
        })
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        return data
      } catch (error) {
        throw error
      }
    },
    [dispatch]
  )

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await authAPI.login({ email, password })
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        return data
      } catch (error) {
        throw error
      }
    },
    [dispatch]
  )

  const logoutUser = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout: logoutUser,
  }
}
