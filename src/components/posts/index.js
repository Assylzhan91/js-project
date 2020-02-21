import { Component } from 'core/component'
import { apiService } from 'services/api.service'
import { Transform } from 'services/transform'
import { renderPost } from 'templates/post.template'
import { Loader } from '../loader'

export class Posts extends Component{
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', btnSavePost.bind(this))
    }


    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        let posts = Transform.fbObjectFromArr(fbData)
        const html =  posts.map(item => renderPost(item, {  isButton: true}))
        this.loader.hide()
        this.$el.innerHTML = html.join(' ')
    }

    onHide(){
        this.$el.innerHTML = ''
    }

}

function btnSavePost(e){
    let btn = e.target
    let id = btn.dataset.id



    if(id){
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []

        if(favorites.includes(id) && btn.classList.contains('button-danger')){
            btn.textContent = "Save"
            btn.classList.remove('button-danger')
            favorites = favorites.filter(favId => favId !== id)
        }else{
            btn.classList.add('button-danger')
            btn.textContent = "Delete"
            favorites.push(id)
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}
