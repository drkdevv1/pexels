export const logout = (redirect_route: string) => {
    localStorage.clear()
    window.location.assign(redirect_route)
}