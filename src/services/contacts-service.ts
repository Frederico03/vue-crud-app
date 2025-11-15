import { Ref } from "vue";
import { Api } from "./api"
import { Contact } from "../types/contactTypes";
import { LaravelPagination } from "../types/paginationType";

class ContactService {
    private api = Api.getInstance()

    async readContacts(page: number = 1): Promise<LaravelPagination<Contact> | undefined> {
        try{
            const contacts = await this.api.get(`/api/contacts?page=${page}`)
            return contacts.data
        } catch(error: any) {
            console.log(error)
        }
    }

    async createContacts(form: Ref<any>) {
         try {
            const formData = new FormData()
            formData.append('name', form.value.name)
            formData.append('email', form.value.email)
            formData.append('phone', form.value.phone)
            if (form.value.image) {
            formData.append('image', form.value.image)
            }

            await this.api.post('/api/contacts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        } catch (error: any) {
            console.error(error)
            alert('Erro ao criar contato. Verifique os dados e tente novamente.')
        }
    }

    async updateContact(id: string, form: Ref<any>) {
        try {
            const formData = new FormData()

            formData.append('name', form.value.name)
            formData.append('email', form.value.email)
            formData.append('phone', form.value.phone)

            if (form.value.image instanceof File) {
                formData.append('image', form.value.image)
            }

            await this.api.post(`/api/contacts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT',
                },
            })
        } catch (error: any) {
            console.error(error)
            alert('Erro ao atualizar contato. Verifique os dados e tente novamente.')
        }
    }

    async deleteContact(id: string): Promise<void> {
        try {
            await this.api.delete(`/api/contacts/${id}`);
        } catch(error: any) {
            console.log(error)
        }
    }

    searchInList(name: string, list: Contact[]): Contact[] {
        return list.filter(contact =>
            contact.name.toLowerCase().includes(name.toLowerCase())
        )
    }
}

export const contactService = new ContactService()
