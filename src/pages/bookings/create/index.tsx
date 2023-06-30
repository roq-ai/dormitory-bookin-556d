import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createBooking } from 'apiSdk/bookings';
import { Error } from 'components/error';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { DormitoryInterface } from 'interfaces/dormitory';
import { getUsers } from 'apiSdk/users';
import { getDormitories } from 'apiSdk/dormitories';
import { BookingInterface } from 'interfaces/booking';

function BookingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBooking(values);
      resetForm();
      router.push('/bookings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: {
      checkin_date: new Date(new Date().toDateString()),
      days_to_stay: 0,
      number_of_persons: 0,
      total_price: 0,
      user_id: (router.query.user_id as string) ?? null,
      dormitory_id: (router.query.dormitory_id as string) ?? null,
    },
    validationSchema: bookingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Booking
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="checkin_date" mb="4">
            <FormLabel>Checkin Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.checkin_date ? new Date(formik.values?.checkin_date) : null}
                onChange={(value: Date) => formik.setFieldValue('checkin_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="days_to_stay" mb="4" isInvalid={!!formik.errors?.days_to_stay}>
            <FormLabel>Days To Stay</FormLabel>
            <NumberInput
              name="days_to_stay"
              value={formik.values?.days_to_stay}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('days_to_stay', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.days_to_stay && <FormErrorMessage>{formik.errors?.days_to_stay}</FormErrorMessage>}
          </FormControl>
          <FormControl id="number_of_persons" mb="4" isInvalid={!!formik.errors?.number_of_persons}>
            <FormLabel>Number Of Persons</FormLabel>
            <NumberInput
              name="number_of_persons"
              value={formik.values?.number_of_persons}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('number_of_persons', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.number_of_persons && <FormErrorMessage>{formik.errors?.number_of_persons}</FormErrorMessage>}
          </FormControl>
          <FormControl id="total_price" mb="4" isInvalid={!!formik.errors?.total_price}>
            <FormLabel>Total Price</FormLabel>
            <NumberInput
              name="total_price"
              value={formik.values?.total_price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('total_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.total_price && <FormErrorMessage>{formik.errors?.total_price}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<DormitoryInterface>
            formik={formik}
            name={'dormitory_id'}
            label={'Select Dormitory'}
            placeholder={'Select Dormitory'}
            fetcher={getDormitories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'booking',
    operation: AccessOperationEnum.CREATE,
  }),
)(BookingCreatePage);
