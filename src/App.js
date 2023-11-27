// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 }
  }
};
const App = () => {
  const [queryClient] = useState(new QueryClient(queryClientOption));
  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <ScrollTop>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes />
          </LocalizationProvider>
        </ScrollTop>
      </QueryClientProvider>
    </ThemeCustomization>
  );
};

export default App;
