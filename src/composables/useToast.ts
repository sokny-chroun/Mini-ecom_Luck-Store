import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
    id: number
    message: string
    type: ToastType
    timeout?: number
}

// Create a single ref that will be shared across all instances
const toasts = ref<Toast[]>([])

export function useToast() {
    const showToast = (message: string, type: ToastType = 'info', timeout: number = 3000) => {
        const id = Date.now()
        toasts.value.push({ id, message, type, timeout })

        if (timeout > 0) {
            setTimeout(() => {
                removeToast(id)
            }, timeout)
        }

        return id
    }

    const removeToast = (id: number) => {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    const toast = {
        success: (message: string, timeout?: number) => showToast(message, 'success', timeout),
        error: (message: string, timeout?: number) => showToast(message, 'error', timeout),
        info: (message: string, timeout?: number) => showToast(message, 'info', timeout),
        warning: (message: string, timeout?: number) => showToast(message, 'warning', timeout)
    }

    return {
        toasts,
        toast,
        removeToast
    }
}