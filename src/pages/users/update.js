import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { updateUser, useUserById } from 'apis/users';
import AnimateButton from 'components/@extended/AnimateButton';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
// third party
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import * as Yup from 'yup';

const Update = () => {
  const { id } = useParams();
  const { data, isLoading } = useUserById(id);

  const push = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries(['/user/{id}']);
      push('/users');
    },
    onError: () => {
      toast.error('User updated failed');
    }
  });

  if (isLoading) return <Loader />;

  return (
    <Box>
      <MainCard sx={{ mt: 2, p: 4 }} content>
        <Formik
          initialValues={{
            fullName: data.fullName ?? '',
            email: data?.email ?? ''
          }}
          validationSchema={Yup.object().shape({
            fullName: Yup.string().max(255).required('Name is required'),
            email: Yup.string().email().required('Email is required')
          })}
          onSubmit={async (values) => {
            mutate({ id, payload: values });
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Full Name*</InputLabel>
                    <OutlinedInput
                      type="name"
                      value={values.fullName}
                      name="fullName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.fullName && errors.fullName)}
                    />
                    {touched.fullName && errors.fullName && <FormHelperText error>{errors.fullName}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Email*</InputLabel>
                    <OutlinedInput
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="user@example.com"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Update
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </Box>
  );
};

export default Update;
