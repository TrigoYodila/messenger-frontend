export const getSessionStorage = () => {
    let storage = sessionStorage
    const saveUser = (user) => {
        if(user && user !== undefined){
            storage.setItem("user", JSON.stringify(user))
        }

    }

    const getUser = () => {
        let user = JSON.parse(storage.getItem("user"))
        return user
    }

    const saveToken = (token) => {
        storage.setItem("token", token)
    }

    const getToken = () => {
        let token = storage.getItem("token")
        return token
    }

    const logout = () => {
        storage.removeItem("user")
        storage.removeItem("token")
    }

    return {
        saveToken,
        saveUser,
        getToken,
        getUser,
        logout
    }
}