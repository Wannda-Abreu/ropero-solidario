type User = {
    user_id?: string | null;
    user_name: string;
    surname: string;
    nationality: string;
    date_of_last_report_id?: string | null;
    family_members_id?: string | null;
    zip_code_id?: string | null;
    reference_center_id?: string | null;
    appointment_id?: string | null;
} & Record<string, string | string[] | undefined>;
export default User;