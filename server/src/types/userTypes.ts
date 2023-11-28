type User = {
    user_id?: string |undefined| null;
    user_name: string,
    surname: string,
    nationality: string,
    user_status: string | boolean,
    date_of_last_report_id?: string |undefined| null,
    family_members_id?: string| undefined| null,
    zip_code_id?: string| undefined| null,
    reference_center_id?: string| undefined| null,
    appointment_id?: string | undefined| null
}
export default User;