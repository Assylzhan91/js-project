class ApiService {
    constructor(url){
        this.url = url
    }

    async createPost(post){

        try{
            const request = new Request(this.url + 'post.json', {
                method: 'post',
                body: JSON.stringify(post),
            })
            return  useRequest(request)
        }
        catch (err) {
            console.log(err)
        }

    }


    async fetchPosts(){
        try {
            const request = new Request(`${this.url}post.json`)

            return  useRequest(request )
        }
        catch (err) {

        }
    }

    async fetchPostsById(id){
        try {
            const request = new Request(`${this.url}post/${id}.json`)

            return  useRequest(request )
        }
        catch (err) {

        }
    }

    async getPostsTitle(){
        try {
            const request = new Request(`${this.url}post.json`)
            return  await useRequest(request)
        }
        catch (err) {

        }
    }
}

async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://js-project-4449e.firebaseio.com/')