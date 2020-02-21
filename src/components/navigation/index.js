import { Component } from 'core/component'

export class Navigation extends Component{
    constructor(id){
        super(id)
        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs){
        this.tabs = tabs
    }
}

function tabClickHandler(event){
    event.preventDefault()
    const link = Array.from(this.$el.querySelectorAll('.tab'))

    const getDataName =  event.target.dataset.name

    if(event.target.classList.contains('tab')){
        link.forEach(a => a.classList.remove('active'))
        event.target.classList.add('active')
    }

    let activeTab = this.tabs.find(tab=>tab.name === getDataName)
    this.tabs.forEach(tab => tab.component.hide())
    activeTab.component.show()
}