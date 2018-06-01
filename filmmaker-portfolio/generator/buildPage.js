const path = require('path');
const fs = require('fs-extra');
const hb = require('handlebars');
const {EOL} = require('os');

hb.registerHelper('json',context=>JSON.stringify(context))

const context = {
    navItems: [
        'photos',
        'videos',
        'graphics',
        'about',
        'contact',
    ].map(item=>({href:`#${item}`,label:item})),

    portfolio: fs.readdirSync(path.join(__dirname,'..','img', 'portfolio'))
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    .map(i=>({src:`img/portfolio/${i}`})),

    videos: [
        'https://www.youtube.com/embed/BgTHsEsquZw',
        'https://www.youtube.com/embed/rGNAFk_NR20',
        'https://www.youtube.com/embed/dzpCMS3qs2A',
        'https://www.youtube.com/embed/IcXxBJjrnaY',
        'https://www.youtube.com/embed/HfnuTITuJjk',
        'https://www.youtube.com/embed/OuxVyAbQ0Pg'

    ].map((src,index,arr)=>({src,even:index%0==0,odd:index%0===1||arr.length-1===index}))
}


const filePromise = fs.readFile(path.join(__dirname,'index.html'),'utf8');

filePromise
.then(html=>hb.compile(html)(context))
.then(html=>fs.writeFile(path.join(__dirname,'..','home.html'),html,'utf8'))
.catch(console.error)