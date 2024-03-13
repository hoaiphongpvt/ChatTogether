export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:3000/api/user/logout',
        })

        if (res.data.status === 'success') {
            location.assign('/login')
        }
    } catch (err) {
        alert(err.response.data.message)
    }
}
