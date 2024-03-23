import { login } from './login.js'
import { logout } from './logout.js'
import { getInbox } from './getInbox.js'
import { scrollToBottom } from './scrollBottom.js'
import { sendMessage } from './sendMessage.js'

// Elements
const btnLogin = document.getElementById('btn-login')
const btnLogout = document.getElementById('btn-logout')
const inboxItems = document.querySelectorAll('.inbox')
const frmGetInboxes = document.querySelectorAll('form[name="frmGetInbox"]')
const messageContainer = document.getElementById('messageContainer')
const btnSend = document.getElementById('btnSend')

if (messageContainer) {
    window.onload = function () {
        scrollToBottom()
    }
}

if (btnSend) {
    btnSend.addEventListener('click', (e) => {
        const content = document.getElementById('txtContent').value
        // Lấy URL hiện tại
        const urlParams = new URLSearchParams(window.location.search)
        // Lấy giá trị của tham số 'currUserId'
        const currUserId = urlParams.get('currUserId')
        // Lấy giá trị của tham số 'toUserId'
        const toUserId = urlParams.get('toUserId')
        sendMessage(currUserId, toUserId, content)
    })
}

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
            item.childNodes[0].submit()
        })
    })
}
