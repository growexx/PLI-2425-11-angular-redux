import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TaskStore {
  tasks: any[],
  loading: boolean,
  error: any,
}

const initialState: TaskStore = {
  tasks: [],
  loading: false,
  error: null
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    storeTasks: (state, action: PayloadAction<any>) => {
      state.tasks = action.payload ;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.unshift(action.payload);
      state.loading = false; 
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      state.tasks = state.tasks.filter(task => task.id != action.payload)
      state.loading = false; 
    },
    updateTask: (state, action: PayloadAction<any>) => {
      state.tasks = state.tasks.map(task => task.id == action.payload.id ? action.payload.task : task)
      state.loading = false; 
    }
  }
})

export const { storeTasks, setLoading, addTask, deleteTask, updateTask } = taskSlice.actions

export default taskSlice.reducer
