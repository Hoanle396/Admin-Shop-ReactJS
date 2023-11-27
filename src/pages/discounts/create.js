import { DollarOutlined } from '@ant-design/icons';
import { Box, Button, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

const CreateDiscounts = () => {
  return (
    <Box>
      <MainCard sx={{ mt: 2, p: 4 }} content>
        <Formik
          initialValues={{
            code: '',
            description: '',
            type: 0,
            value: '',
            endDate: ''
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string()
              .max(255)
              .required()
              .label('Code')
              .transform((value) => (value !== null ? value.toUpperCase() : value)),
            description: Yup.string().max(1000).required('Description'),
            type: Yup.number().oneOf([0, 1]),
            value: Yup.number()
              .min(1)
              .required()
              .label('Value')
              .when('type', (type, field) => (type == 1 ? field.max(100) : field)),
            endDate: Yup.mixed().required().label('End Date')
          })}
          onSubmit={async (values) => {
            console.log({ ...values });
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Code*</InputLabel>
                    <OutlinedInput
                      type="name"
                      value={values.code}
                      name="code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Code"
                      fullWidth
                      error={Boolean(touched.code && errors.code)}
                    />
                    {touched.code && errors.code && <FormHelperText error>{errors.code}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Type</InputLabel>
                    <TextField
                      select
                      fullWidth
                      error={Boolean(touched.type && errors.type)}
                      value={values.type}
                      name="type"
                      placeholder="Type"
                      onChange={handleChange}
                    >
                      {[
                        { value: 1, label: 'PERCENT' },
                        { value: 0, label: 'VALUE' }
                      ].map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.type && errors.type && <FormHelperText error>{errors.type}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Description</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Description"
                      inputProps={{}}
                      multiline
                      rows={5}
                    />
                    {touched.description && errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Value</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.value && errors.value)}
                      value={values.value}
                      name="value"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Value"
                      inputProps={{}}
                      startAdornment={
                        <InputAdornment position="start">
                          <DollarOutlined />
                        </InputAdornment>
                      }
                    />
                    {touched.value && errors.value && <FormHelperText error>{errors.value}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>End Date</InputLabel>
                    <DateTimePicker
                      disablePast
                      onChange={(e) => setFieldValue('endDate', e)}
                      placeholder="End Date"
                      textField={(props) => (
                        <OutlinedInput
                          {...props}
                          error={Boolean(touched.endDate && errors.endDate)}
                          name="endDate"
                          onBlur={handleBlur}
                          fullWidth
                        />
                      )}
                      minDateTime={dayjs()}
                    />
                    {touched.endDate && errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
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
                      Create
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

export default CreateDiscounts;
