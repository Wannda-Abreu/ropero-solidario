import zod from 'zod';

const adminUserSchema = zod.object({
  admin_name: zod.string({
    invalid_type_error: 'admin name must be a string',
    required_error: 'admin name must be a string',
  }),
  admin_surname: zod.string({
    invalid_type_error: 'admin surname must be a string',
    required_error: 'admin surname must be a string',
  }),
  email: zod.string({
    invalid_type_error: 'email must be a string',
    required_error: 'email is required',
  }).email(),
  admin_password: zod.string({
    invalid_type_error: 'admin password must be a string',
    required_error: 'admin password is required',
  }).min(8)
})

export function validateAdminUser(object: any) {
  return adminUserSchema.safeParse(object);
};