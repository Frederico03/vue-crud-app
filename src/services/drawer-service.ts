import { Drawer } from 'flowbite'
import type { DrawerOptions, DrawerInterface } from 'flowbite'
import type { InstanceOptions } from 'flowbite'

class DrawerService {
  private drawers = new Map<string, DrawerInterface>()

  openDrawer(id: string) {
    const targetEl = document.getElementById(id)

    if (!targetEl) {
      console.error(`Drawer "${id}" não encontrado.`)
      return
    }

    if (this.drawers.has(id)) {
      this.destroyDrawer(id)
    }

    const options: DrawerOptions = {
      placement: 'left',
      backdrop: true,
      bodyScrolling: false,
      edge: false,
      backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
      onHide: () => {
        console.log(`Drawer ${id} foi fechado`)
      },
      onShow: () => console.log(`Drawer ${id} foi aberto`),
      onToggle: () => console.log(`Drawer ${id} foi alternado`)
    }

    const instanceOptions: InstanceOptions = {
      id,
      override: true
    }

    const drawer = new Drawer(targetEl, options, instanceOptions)
    drawer.show()

    this.drawers.set(id, drawer)
  }

  closeDrawer(id: string) {
    const drawer = this.drawers.get(id)
    if (drawer) drawer.hide()
  }

  destroyDrawer(id: string) {
    const drawer = this.drawers.get(id)
    if (drawer) {
      drawer.hide()
      this.drawers.delete(id)
      console.log(`Drawer ${id} foi destruído`)
    }
  }

  closeAll() {
    for (const id of this.drawers.keys()) {
      this.destroyDrawer(id)
    }
  }
}

export const drawerService = new DrawerService()
