const tileLayer =  [
  
 

  {
    name:'Basic',
    // attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    url:'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  },
  {
    name:'Dark basic',
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    url:'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',

  },
   {
    name:'No labels, positron',
    url:'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
},
  {
  name: "Osm Mapnik",
  attribution: '',
  url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
},
{
  name: "Dark",
  attribution: '',
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
},
{name:'premium',
url:'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=185229c8e1mshc895d614611193bp159780jsn771c4412b753', 
attribution: '',
maxZoom: 19,
},
{name:'stamen',attributoin:'',url:'http://{s}.sm.mapstack.stamen.com/(toner-background,$fff[difference],toner-lines[destination-in])/{z}/{x}/{y}.png'},
{name:'blank',attribution:'',url:''}]
export default tileLayer;