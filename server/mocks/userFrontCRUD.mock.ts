const BASE_URL = 'http://localhost:2000/users';

const getUsersMock = async () :Promise<Response>=> {
    return (
        await fetch(BASE_URL)
)}

const getUserMock = async (id : any/*any para probar datos erroneos, {token: jwt}*/) => {
    return (
        await fetch(`${BASE_URL}/${id}` , {
          headers: {
            // Authorization: `Bearer ${token}`, INCLUIR JWT
          },
        })
    ).json()
}

const createUsersMock = async (user: any) =>{
    return(
        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                 // Authorization: `Bearer ${token}`, INCLUIR JWT
            },
            body: JSON.stringify(user)
        })
    )
}

const updateUserMock = async (id: any, user: any/*,{token}*/) =>{
    return (
        await fetch(`${BASE_URL}/${id}` , {
          method: 'PATCH',
          headers: {
            // Authorization: `Bearer ${token}`, INCLUIR JWT
          },
          body:JSON.stringify(user)
        })
    )
}

const deleteUserMock = async (id : any/*,{token}*/) => {
    return(
        await fetch (`${BASE_URL}/${id}`,{
          method: 'DELETE',
          headers: {
            // Authorization: `Bearer ${token}`, INCLUIR JWT
          }
        })
    )

}
export {getUsersMock, getUserMock,updateUserMock,createUsersMock,deleteUserMock};

    