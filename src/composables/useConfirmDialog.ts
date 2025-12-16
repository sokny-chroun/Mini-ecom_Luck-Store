import { ref } from 'vue';

interface ConfirmDialogOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    icon?: any;
    iconContainerClass?: string;
    iconClass?: string;
}

export function useConfirmDialog() {
    const dialogRef = ref<{ show: () => void; hide: () => void } | null>(null);
    const isOpen = ref(false);
    const options = ref<ConfirmDialogOptions>({
        title: 'Confirm Action',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
    });

    const show = (message: string, dialogOptions: Partial<ConfirmDialogOptions> = {}) => {
        return new Promise<boolean>(() => {
            options.value = {
                ...options.value,
                message,
                ...dialogOptions,
            };
            isOpen.value = true;
            dialogRef.value?.show();
        });
    };

    const onConfirm = () => {
        isOpen.value = false;
        return true;
    };

    const onCancel = () => {
        isOpen.value = false;
        return false;
    };

    return {
        dialogRef,
        isOpen,
        options,
        show,
        onConfirm,
        onCancel,
    };
}