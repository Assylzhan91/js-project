import { Component } from 'core/component'
import { Forms } from 'core/forms'
import { Validators } from 'core/validators'
import { apiService } from 'services/api.service'


export class Create extends Component{
    constructor(id) {
        super(id)
    }

    init() {

        this.forms = new Forms(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        })

        this.$el.addEventListener('submit',submitHandler.bind(this))

    }
}

async function submitHandler (event){
    event.preventDefault()
    if(this.forms.isValid()){
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.forms.values()
        }
        await apiService.createPost(formData)

        this.forms.clearForm()

        alert('Post is created on database')

    }

    // this.forms.values()
}