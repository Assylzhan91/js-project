export class Forms {
    constructor(forms, controls){
        this.forms = forms
        this.controls = controls
    }

    clearForm(){
        Object.keys(this.controls).forEach( control => {
            this.forms[control].value = ''
        })
    }

    values(){
        const value = {}

        Object.keys(this.controls).forEach( control => {
            value[control] = this.forms[control].value
        })
        return value
    }

    isValid(){
        let isValidForms = true
        Object.keys(this.controls).forEach(control=>{
            const validators = this.controls[control]

            let isValid = true

            validators.forEach(validator =>{
                isValid = validator(this.forms[control].value) && isValid
            })

            isValid
                ? clearError(this.forms[control])
                : setError(this.forms[control])
            isValidForms = isValidForms && isValid
        })


        return isValidForms
    }
}

function setError(control){
    clearError(control)
    const error = `<p class="validation-error">Enter correct value</p>`
    control.classList.add('invalid')
    control.insertAdjacentHTML('afterend', error)
}

function clearError(control) {
    control.classList.remove('invalid')
    if(control.nextSibling){
        control.closest('.form-control').removeChild(control.nextSibling)
    }

}
