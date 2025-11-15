import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import type { InstanceOptions } from 'flowbite'

class ModalService {
    private modals = new Map<string, ModalInterface>()

    openModal(id: string) {
        const targetEl = document.getElementById(id)

        if (!targetEl) {
            console.error(`Modal "${id}" não encontrado.`)
            return
        }

        if (this.modals.has(id)) {
            this.destroyModal(id)
        }

        const options: ModalOptions = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses:
                'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
        }

        const instanceOptions: InstanceOptions = {
            id,
            override: true,
        }

        const modal = new Modal(targetEl, options, instanceOptions)
        modal.show()

        this.modals.set(id, modal)
    }

    closeModal(id: string) {
        const modal = this.modals.get(id)
        console.log(modal)
        if (modal) modal.hide()
    }

    destroyModal(id: string) {
        const modal = this.modals.get(id)
        if (modal) {
            modal.hide()
            this.modals.delete(id)
        }
    }

    closeAll() {
        for (const id of this.modals.keys()) {
            this.destroyModal(id)
        }
    }
}

export const modalService = new ModalService()
