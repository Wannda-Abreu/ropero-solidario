

type Admin_UserT = {
    admin_user_id ?: string;
    admin_name?: string | undefined;
    admin_surname?: string;
    email?: string;
    admin_password: string;
    [key: string]: string | string[] | undefined;

}

export default Admin_UserT
