import { login } from './login.js'
import { logout } from './logout.js'
import { getInbox } from './getInbox.js'

// Elements
const btnLogin = document.getElementById('btn-login')
const btnLogout = document.getElementById('btn-logout')
const inboxItems = document.querySelectorAll('.inbox')

//Respone

if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        login(email, password)
    })
}

if (btnLogout) {
    btnLogout.addEventListener('click', () => logout())
}

if (inboxItems) {
    inboxItems.forEach((item) => {
        item.addEventListener('click', async (e) => {
            const inbox = await getInbox(
                item.getAttribute('data-currUserId'),
                item.getAttribute('data-toUserId'),
            )

            console.log(inbox)
        })
    })
}
