import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/list/List"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { Form } from "./components/form"
import { atom, useAtom } from "jotai"
import { FormAtom, FormValues } from "./types/todoTypes"
import { useTodoItems } from "./services/useTodo"

export const formAtom = atom<FormAtom>({ isOpened: false, values: { label: "" } })

export const App = () => {
  const [form, setForm] = useAtom(formAtom)
  const { addItem, useGetItems } = useTodoItems()
  const { items, loading, error } = useGetItems()

  const errorString = error ? `Sorry, there was an error in our app: ${error.message}` : undefined

  const handleFormSubmit = async (value: FormValues) => {
    await addItem(value.label)
    setForm({
      values: { label: "" },
      isOpened: false,
    })
  }

  const handleFormCancel = () => {
    setForm({
      values: { label: "" },
      isOpened: false,
    })
  }

  return (
    <ThemeProvider>
      <Container>
        <Layout>
          <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>

          <List items={items} loading={loading} error={errorString} />
          {form.isOpened && (
            <Form initialValues={form.values} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
          )}
          <Footer
            todoItems={items?.filter((item) => !item.isDone).length}
            doneItems={items?.filter((item) => item.isDone).length}
          />
        </Layout>
      </Container>
    </ThemeProvider>
  )
}
