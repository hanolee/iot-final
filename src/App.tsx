import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'

import ErrorBoundary from './ErrorBoundary'
import PageRouter from './PageRouter'
import Error from './pages/Error'

const theme = createTheme()

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Error />}>
        <ThemeProvider theme={theme}>
          <PageRouter />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
