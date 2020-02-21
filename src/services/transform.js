export class Transform {
    static fbObjectFromArr(fbData){
       return  Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
             return item
        })

    }
}