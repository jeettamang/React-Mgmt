export const setToken=(value)=>localStorage.setItem("access_token", value)
export const setItem=(Key, value)=> localStorage.setItem(Key, value)
export const getItem=(key="access_tokem")=>localStorage.getItem(key)
export const removeToken=()=>localStorage.clear();