export const signup = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/user/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
            },
        })

        if (res.data.status === 'success') {
            alert('Sign Up Successfully')
            location.assign('/login')
        }
    } catch (err) {
        console.log(err)
        alert(err.response.data.message)
    }
}
