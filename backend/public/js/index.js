import { login } from './login.js'
import { logout } from './logout.js'
import { signup } from './signup.js'
import { getInbox } from './getInbox.js'
import { scrollToBottom } from './scrollBottom.js'
import { sendMessage } from './sendMessage.js'

const ws = new WebSocket('ws://localhost:3000')

// Xử lý tin nhắn từ máy chủ WebSocket
ws.onmessage = function (event) {
    console.log('Đã nhận được thông điệp từ máy chủ.')
    if (event.data === 'reload') {
        window.location.reload() // Load lại trang khi nhận được tin nhắn 'reload'
    }
}

// Gửi tin nhắn khi kết nối WebSocket được mở
ws.onopen = function () {
    console.log('WebSocket connection opened!')
}

// Elements
const btnLogin = document.getElementById('btn-login')
const btnSignup = document.getElementById('btn-signup')
const btnLogout = document.getElementById('btn-logout')
const inboxItems = document.querySelectorAll('.inbox')
const frmGetInboxes = document.querySelectorAll('form[name="frmGetInbox"]')
const messageContainer = document.getElementById('messageContainer')
const btnSend = document.getElementById('btnSend')
const inputMessage = document.getElementById('txtContent')

if (messageContainer) {
    window.onload = function () {
        scrollToBottom()
    }
}

if (inputMessage) {
    inputMessage.addEventListener('input', (e) => {
        if (inputMessage.value === '') {
            btnSend.setAttribute('disabled', true)
        } else {
            btnSend.removeAttribute('disabled')
        }
    })
}

if (btnSend) {
    btnSend.setAttribute('disabled', true)
    btnSend.addEventListener('click', (e) => {
        const content = document.getElementById('txtContent').value
        const urlParams = new URLSearchParams(window.location.search)
        const currUserId = urlParams.get('currUserId')
        const toUserId = urlParams.get('toUserId')

        //Gửi thông điệp đến server
        ws.send(content)
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

if (btnSignup) {
    btnSignup.addEventListener('click', (e) => {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        signup(name, email, password, confirmPassword)
    })
}

if (inboxItems) {
    inboxItems.forEach((item) => {
        item.addEventListener('click', async (e) => {
            item.childNodes[0].submit()
        })
    })
}
