
import axios from 'axios';
import langText from './fastapi.json'

import { toast, Flip } from 'react-toastify';


const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})

var lang = 'es'
let toastFAPI = 'toastFAPI'
const defaultAlert = {
    bool: false,
    msg: langText[lang]?.errors?.fapi,
    value: false,
    status: false,
    variant: 'default'
}
var alert = { ...defaultAlert }


const analyzeResponse = (response) => {
    // console.log(response)
    if (response) {
        alert.msg = false
        alert.status = response.status

        if (alert.status >= 200 && alert.status < 300) alert.bool = true

        if (alert.status === 200) {
            alert.variant = 'success'

            alert.msg = response.data?.detail
            alert.value = response.data?.value
        } else if (alert.status === 206) {
            alert.variant = 'info'

            alert.msg = response.data.detail?.detail
            alert.value = response.data.detail?.value
        }

        if (alert.msg && alert.status) showAlert()
    }
}
const analyzeError = (e) => {
    // console.log('analyzeError', e)
    alert.msg = alert?.message || false
    if (["ERR_NETWORK", "ERR_BAD_RESPONSE"].includes(e.code)) {
        alert.status = 500
        alert.msg = langText[lang]?.errors?.server
    } else if (e.code === "ERR_BAD_REQUEST") {
        alert.status = e.response?.status || e.response.request.status
    }

    if (alert.status) {
        alert.variant = 'error'
        if (alert.status < 500) {
            const detail = e?.response?.data?.detail

            var msg = false
            if (Array.isArray(detail)) {
                msg = detail[0]?.msg
            } else {
                msg = langText[lang]?.errors[detail]
            }
            alert.msg = msg ? msg : detail
        }
    }

    if (alert.msg && alert.status) showAlert()
}

const showAlert = () => {
    const msg = alert.msg?.title
        ? <div>
            <div className='font-semibold'>{alert.msg.title}:</div>
            <div >{alert.msg.content}.</div>
        </div>
        : alert.msg

    if (!toast.isActive(toastFAPI)) {
        toastFAPI = toast(msg, {
            type: alert.variant,
        })
    } else {
        toast.update(toastFAPI, {
            render: msg,
            type: alert.variant,
            transition: Flip
        })
    }

}

export const fastapi = {
    get: getFAPI,
    post: postFAPI,
    put: putFAPI,
    delete: deleteFAPI,
    getImg: postFAPIgraph,
}


export async function getFAPI(action, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

    await client.get(action)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}

export async function postFAPI(action, data, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

    await client.post(action, data)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}

export async function deleteFAPI(action) {
    alert = { ...defaultAlert }

    await client.delete(action)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}

export async function putFAPI(action, data) {
    alert = { ...defaultAlert }

    await client.put(action, data)
        .then(response => analyzeResponse(response))
        .catch(e => analyzeError(e))

    return alert
}

export async function postFAPIgraph(action, data, currentLang) {
    alert = { ...defaultAlert }
    currentLang && (lang = currentLang)

    const config_post = {
        responseType: "blob",
    }

    await client.post(action + "/", data, config_post)
        .then(response => {
            const url = URL.createObjectURL(response.data)

            alert.bool = true
            alert.value = url
        })
        .catch(e => {
            if (e?.response?.data) {
                var reader = new FileReader()
                reader.onload = function (x) {
                    const texto = x.target.result
                    e.response.data = JSON.parse(texto)
                    analyzeError(e)
                }
                reader.readAsText(e.response.data)
            }
        })

    return alert
}