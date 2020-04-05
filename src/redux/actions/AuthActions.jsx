
export const LoginUser=(data)=>{
    return{
        type:'USER_LOGIN_SUCCESS',
        payload:data
    }
}

export const Logout=()=>{
    return{
        type:'USER_LOGOUT_SUCCESS',
    }
}

export const KeepLogin=(data)=>{
    return{
        type:'KEEP_LOGIN',
        payload:data
    }
}

export const EditUsernameEmailUser=(data)=>{
    return{
        type:'EDIT_NAME_EMAIL_USER',
        payload:data
    }
}

export const EditPasswordUser=(data)=>{
    return{
        type:'EDIT_PASSWORD_USER',
        payload:data
    }
}