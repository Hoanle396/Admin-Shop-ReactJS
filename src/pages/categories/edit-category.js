import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { useCategoryById } from 'apis/category/queries';
import { updateCategory } from 'apis/category/request';
import AnimateButton from 'components/@extended/AnimateButton';
import Loader from 'components/Loader';
import MainCard from 'components/MainCard';
// third party
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import * as Yup from 'yup';
const EditCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useCategoryById(id);

  const push = useNavigate();

  const { mutate } = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success('Category updated successfully');
      push('/categories');
    },
    onError: () => {
      toast.error('Category updated failed');
    }
  });

  if (isLoading) return <Loader />;

  return (
    <Box>
      <MainCard sx={{ mt: 2, p: 4 }} content>
        <Formik
          initialValues={{
            name: data?.name ?? '',
            description: data?.description ?? ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            description: Yup.string().max(1000).required('Description is required')
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
                    <InputLabel htmlFor="name-signup">Category Name*</InputLabel>
                    <OutlinedInput
                      id="name-login"
                      type="name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="helper-text-name-signup">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="description-signup">Description</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      id="description-signup"
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Demo Inc."
                      inputProps={{}}
                      multiline
                      rows={3}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error id="helper-text-description-signup">
                        {errors.description}
                      </FormHelperText>
                    )}
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
                      Save
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

export default EditCategory;
