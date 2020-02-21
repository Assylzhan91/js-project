export function renderPost(post, options = {}) {

    let { date,
        fulltext,
        title,
        type,
        id } = post
    let styleColor

    switch (type) {
        case 'note':
            type = 'Заметки'
            styleColor = 'tag-red'
            break
        case 'news':
            type = 'Новости'
            styleColor = 'tag-blue'
            break
    }


    let  isHaveLocalStorage =  (JSON.parse(localStorage.getItem('favorites')) || []).includes(id)

    let btnSave = isHaveLocalStorage
        ? `<button 
        class="button-small button-primary button-round button-danger"
        data-id="${id}">Delete</button>`
        : `<button 
        class="button-small button-primary button-round"
        data-id="${id}">Save</button>`

    return `
     <div class="panel">
        <div class="panel-head">
          <p class="panel-title">${title}</p>
          <ul class="tags">
            <li class="tag ${styleColor} tag-rounded">${type}</li>
          </ul>
        </div>
        <div class="panel-body">
          <p class="multi-line">${fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
          <small>${date}</small>
          ${ options.isButton ? btnSave : ''}  
        </div>
      </div>
    `
}