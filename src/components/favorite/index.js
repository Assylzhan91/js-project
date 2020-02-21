import { Component } from 'core/component'
import { apiService } from 'services/api.service'
import { renderPost } from 'templates/post.template'

export class Favorite extends Component{
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }


     async onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))

        const postTitle = await apiService.getPostsTitle()

        const html =  renderList(favorites, postTitle)

        this.$el.innerHTML =  html
    }


    onHide() {
        this.$el.innerHTML = ''
    }

}


async function linkClickHandler(event){
    event.preventDefault()
    let tag = event.target

    if(tag.classList.contains('list-favorites__link')){
        const postId = tag.dataset.id
        this.$el.innerHTML = ''
        this.loader.show()
        console.log(postId)
        const postLink = await apiService.fetchPostsById(postId)

        this.$el.innerHTML = renderPost(postLink, {isButton: false})

        this.loader.hide()
    }
}

function renderList(list = [], listPost ={}) {

    if(list && list.length){
        return `
          <ul class="list-favorites">
           ${ list.map(item => {
            let posts =  listPost[item]
            const {title} = posts
            
                return `<li class="list-favorites__item" >
                    <a href="#" data-id="${item}" class="list-favorites__link">${title}</a>
                </li>`   
            }).join(' ') }    
          </ul>  
        `
    }

    return '<p>Post is nothing<p>'
}


