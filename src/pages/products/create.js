import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, InputAdornment, MenuItem, TextField } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';
import { DollarOutlined, PlusCircleOutlined } from '@ant-design/icons';
// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { createProduct } from 'apis/products';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useCategory } from 'apis/category';
const defaultValue = {
  sizeName: '',
  quantity: 0
};

const Create = () => {
  const [sizes, setSizes] = useState([defaultValue]);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const [rows, setRows] = useState([]);
  useCategory({
    onSuccess: (data) => {
      setRows(data);
    },
    onError: () => {
      setRows([]);
    }
  });

  const option = useMemo(() => rows?.map((row) => ({ value: row.id, label: row.name })), [rows]);

  const push = useNavigate();

  const { mutate, isLoading } = useMutation(createProduct, {
    onSuccess: () => {
      toast.success('Product created successfully');
      push('/products');
    },
    onError: () => {
      toast.success('Product created failed');
    }
  });

  useEffect(() => {
    if (images.length < 1) return;
    setImageURLs(images.map((image) => URL.createObjectURL(image)));
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const addSizes = async () => {
    setSizes([...sizes, defaultValue]);
  };

  const handleSubmit = ({ name, description, price, sizes, category }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('price', price);
    form.append('category', category);
    sizes.forEach((size) => {
      form.append('sizes', JSON.stringify(size));
    });
    images.forEach((file) => {
      form.append('images', file);
    });
    mutate(form);
  };

  return (
    <Box>
      <MainCard sx={{ mt: 2, p: 4 }} content>
        <Formik
          initialValues={{
            name: '',
            category: '',
            sizes: [defaultValue],
            images: '',
            price: 0,
            description: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('Name is required'),
            category: Yup.string().required('Category is required'),
            price: Yup.number().min(1).required('Price is required'),
            description: Yup.string().max(1000).required('Description is required'),
            sizes: Yup.array()
              .of(
                Yup.object().shape({
                  sizeName: Yup.string().required().label('Size Name'),
                  quantity: Yup.number().min(1).required().label('Quantity')
                })
              )
              .min(1)
              .required(),
            images: Yup.string().required()
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Products Name*</InputLabel>
                    <OutlinedInput
                      type="name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                    />
                    {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Category</InputLabel>
                    <TextField
                      select
                      fullWidth
                      error={Boolean(touched.category && errors.category)}
                      value={values.category}
                      name="category"
                      onChange={handleChange}
                    >
                      {option.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {touched.category && errors.category && <FormHelperText error>{errors.category}</FormHelperText>}
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
                      placeholder="Demo Inc."
                      inputProps={{}}
                      multiline
                      rows={5}
                    />
                    {touched.description && errors.description && <FormHelperText error>{errors.description}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel>Price</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.price && errors.price)}
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Demo Inc."
                      inputProps={{}}
                      startAdornment={
                        <InputAdornment position="start">
                          <DollarOutlined />
                        </InputAdornment>
                      }
                    />
                    {touched.price && errors.price && <FormHelperText error>{errors.price}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item container xs={12} md={6}>
                  {sizes.map((_, index) => {
                    const fieldName = `sizes[${index}]`;

                    return (
                      <>
                        <Grid item xs={6} px={0.5}>
                          <Stack spacing={1}>
                            <InputLabel>Size Name</InputLabel>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(
                                Array.isArray(touched.sizes) &&
                                  touched.sizes[index]?.sizeName &&
                                  Array.isArray(errors.sizes) &&
                                  errors.sizes[index]?.sizeName
                              )}
                              value={values?.sizes?.length > 0 ? values.sizes[index]?.sizeName : ''}
                              name={`${fieldName}.sizeName`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Demo Inc."
                              inputProps={{}}
                            />
                            {Array.isArray(touched.sizes) &&
                              touched.sizes[index]?.sizeName &&
                              Array.isArray(errors.sizes) &&
                              errors.sizes[index]?.sizeName && <FormHelperText error>{errors.sizes[index].sizeName}</FormHelperText>}
                          </Stack>
                        </Grid>
                        <Grid item xs={6} px={0.5}>
                          <Stack spacing={1}>
                            <InputLabel>Quantity</InputLabel>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(
                                Array.isArray(touched.sizes) &&
                                  touched.sizes[index]?.quantity &&
                                  Array.isArray(errors.sizes) &&
                                  errors.sizes[index]?.quantity
                              )}
                              value={values?.sizes?.length > 0 ? values.sizes[index]?.quantity : ''}
                              name={`${fieldName}.quantity`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Demo Inc."
                              inputProps={{}}
                            />
                            {Array.isArray(touched.sizes) &&
                              touched.sizes[index]?.quantity &&
                              Array.isArray(errors.sizes) &&
                              errors.sizes[index]?.quantity && <FormHelperText error>{errors.sizes[index]?.quantity}</FormHelperText>}
                          </Stack>
                        </Grid>
                      </>
                    );
                  })}
                  <Grid item xs={10}>
                    {touched.sizes && typeof errors.sizes === 'string' && errors.sizes && (
                      <FormHelperText error>{errors.sizes}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={2} pt={1}>
                    <Button variant="contained" fullWidth onClick={addSizes}>
                      <PlusCircleOutlined />
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel>Images</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.images && errors.images)}
                      value={values.images}
                      name="images"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        onImageChange(e);
                      }}
                      type="file"
                      inputProps={{
                        multiple: true
                      }}
                    />
                    <Stack flexDirection="row" gap={1}>
                      {imageURLS.map((imageSrc) => (
                        <img key={imageSrc} src={imageSrc} alt="not fount" width={'250px'} />
                      ))}
                    </Stack>
                    {touched.images && errors.images && <FormHelperText error>{errors.images}</FormHelperText>}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="primary">
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

export default Create;
