import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  description: yup.string().required(),
  dormitory_id: yup.string().nullable(),
});
