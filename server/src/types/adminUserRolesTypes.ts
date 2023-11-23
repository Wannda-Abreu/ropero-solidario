type AdminUserRolesType = {
    admin_user_id? : string;
    roles_id? : string
    [key: string]: string | string[] | undefined;
}

export default AdminUserRolesType