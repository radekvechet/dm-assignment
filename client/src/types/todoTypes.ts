export interface TodoItem {
  label: string
  id: number
  isDone: boolean
  createdAt: number
  finishedAt?: number
}

export interface FormValues {
  label: string
}

export type FormAtom = {
  values: FormValues
  isOpened: boolean
}