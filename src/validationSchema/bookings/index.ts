import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  checkin_date: yup.date().required(),
  days_to_stay: yup.number().integer().required(),
  number_of_persons: yup.number().integer().required(),
  total_price: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  dormitory_id: yup.string().nullable(),
});
