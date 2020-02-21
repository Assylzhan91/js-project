import { Header } from './components/header'
import { Navigation } from './components/navigation'
import { Favorite } from './components/favorite'
import { Posts } from './components/posts'
import { Create } from './components/create'
import { Loader } from './components/loader'

import './css//mustard.scss'
import './css/styles.scss'

new Header('header')

const navigation = new Navigation('navigation')
const loader = new Loader('loader')

const create   = new Create('create')
const posts    = new Posts('posts', {loader})
const favorites = new Favorite('favorites', {loader})

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorites', component: favorites}
])