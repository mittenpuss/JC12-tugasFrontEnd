const INITIAL_STATE={
    isLogin:false,
    loading:false,
    loginerrormes:'hewo'
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "USER_LOGIN_SUCCESS":
            return {...state,isLogin:true,...action.payload,loading:true}
        case "USER_LOGOUT_SUCCESS":
            return {...state,isLogin:false,loading:true}
        case "KEEP_LOGIN":
            return {...state,...action.payload,isLogin:true}
        case "EDIT_NAME_EMAIL_USER":
            return {...state,...action.payload}
        case "EDIT_PASSWORD_USER":
            return {...state,...action.payload}
        default:
            return INITIAL_STATE
    }
}