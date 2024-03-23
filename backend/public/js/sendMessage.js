export const sendMessage = async (curUser, toUser, content) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/message/',
            data: {
                from: curUser,
                to: toUser,
                content,
            },
        })

        if (res.data.status === 'success') {
            window.location.reload()
        }
    } catch (err) {
        alert(err.response.data.message)
    }
}
