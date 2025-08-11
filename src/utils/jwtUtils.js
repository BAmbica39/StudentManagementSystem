export const saveToken=(token)=>
{
    localStorage.setItem('token',token);
}

export const getToken =() =>
{
    return localStorage.getItem('token');
};

export const removeToken=()=>
{
    localStorage.removeitem('token');
}
export const isLoggedIn = ()=>
{
    return !!localStorage.getItem('token');
};

export const getUserRole =() =>
{
    const token = localStorage.getItem('token');
    if(!token) return null;

    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload?.roles?.[0];
    }
    catch(err)
    {
        return null;
    }
}