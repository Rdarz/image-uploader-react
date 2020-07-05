import HomeComponent from '../views/home/HomeContainer'
import ImageComponent from '../views/gallery/GalleryContainer'

// defining path for the components
let routesList = [
  { path: '/', component: HomeComponent, exactPath: true },
  { path: '/gallery', component: ImageComponent, exactPath: true },
  { path: '/error', component: HomeComponent },
  { path: '/pagenotfound', component: HomeComponent }
]

export default routesList
