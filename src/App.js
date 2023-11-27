// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch } from 'react-redux';
import { getMe } from 'store/reducers/auth';
import { Toaster } from 'react-hot-toast';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const queryClientOption = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 }
  }
};
const App = () => {
  const dispatch = useDispatch();
  dispatch(getMe());
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
      <Toaster />
    </ThemeCustomization>
  );
};

export default App;
