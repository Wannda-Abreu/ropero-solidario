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

  date_of_last_report_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID') || zod.null(),
  family_members_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID') || zod.null(),
  zip_code_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID') || zod.null(),
  reference_center_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89 ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID') || zod.null(),
  appointment_id: zod.string().regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    , 'Invalid UUID') || zod.null(),

});

export function validateUser (object: any) {
  return userSchema.safeParse(object)
}