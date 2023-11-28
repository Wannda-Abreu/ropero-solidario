import zod from 'zod'

const userSchema = zod.object ({
  user_name: zod.string({
    invalid_type_error: 'User Name must be a string',
    required_error: 'Name is required'
  }),
  surname: zod.string({
    invalid_type_error: 'User Surname must be a string',
    required_error: 'Surname is required'
  }),
  nationality: zod.string({
    invalid_type_error: 'Nataionality must be a string',
    required_error: 'Nationality is required'
  }),
  user_status: zod.boolean(),

  date_of_last_report_id: zod.null(),
  family_members_id: zod.null(),
  zip_code_id: zod.null(),
  reference_center_id: zod.null(),
  appointment_id: zod.null(),
/* 
  date_of_last_report_id: 
  family_members_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID'),
  zip_code_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID'),
  reference_center_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID'),
  appointment_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID'),
 */
});

export function validateUser (object: any) {
  return userSchema.safeParse(object)
}