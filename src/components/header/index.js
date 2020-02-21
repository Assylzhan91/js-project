import { Component } from 'core/component'

export class Header extends Component{
    constructor(id) {
        super(id)
    }

    init() {
        const isVisited = localStorage.getItem('visited')

        if(isVisited){
            document.getElementById('header').remove()
            // this.hide()
        }
        const headerJsBtn = this.$el.querySelector('.header-js-btn')
        headerJsBtn.addEventListener('click', buttonHandler.bind(this))
    }
}


function buttonHandler(e) {
    localStorage.setItem('visited', JSON.stringify(true))
    document.getElementById('header').remove()
    // this.hide()
}

