export const getInbox = async (currUserId, toUserId) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/message/inbox',
            data: {
                id1: currUserId,
                id2: toUserId,
            },
        })

        if (res.data.status === 'success') {
            return res.data.data
        }
    } catch (err) {
        console.log(err.message)
    }
}
