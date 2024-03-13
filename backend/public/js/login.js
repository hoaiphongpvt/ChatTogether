export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/user/login',
            data: {
                email,
                password,
            },
        })

        if (res.data.status === 'success') {
            alert('Log in successfully')
            window.setTimeout(() => {
                location.assign('/')
            }, 1000)
        }
    } catch (err) {
        alert(err.response.data.message)
    }
}
