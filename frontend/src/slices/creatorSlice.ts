import { createSlice } from '@reduxjs/toolkit'

interface CreatorState {
  creators: any[]
  selectedCreator: any | null
  loading: boolean
}

const initialState: CreatorState = {
  creators: [],
  selectedCreator: null,
  loading: false,
}

const creatorSlice = createSlice({
  name: 'creator',
  initialState,
  reducers: {
    setCreators: (state, action) => {
      state.creators = action.payload
    },
    setSelectedCreator: (state, action) => {
      state.selectedCreator = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setCreators, setSelectedCreator, setLoading } = creatorSlice.actions
export default creatorSlice.reducer
