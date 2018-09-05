console.log('hello')

let imgs = [
  { url: 'body/arms-65.png', x: 15, y: 50, sw: 120, sh: 90 },
  { url: 'body/legs-15.png', x: 37, y: 100, sw: 75, sh: 75 },
  { url: 'body/body-02.png', x: 25, y: 25, sw: 100, sh: 100 },
  { url: 'body/eyes-40.png', x: 22, y: 0, sw: 100, sh: 100 },
  { url: 'body/mouth-25.png', x: 50, y: 40, sw: 50, sh: 50 }
  // { url: 'body/nose-76.png', x: 68, y: 48, sw: 10, sh: 10 },
  // { url: 'body/texture-53.png', x: 50, y: 40, sw: 50, sh: 50 },
  
]

$(document).ready(function(){
  const loadImage = url => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`load ${url} fail`))
      img.src = url
    })
  }
  
  const depict = options => {
    const ctx = getContext()
    const myOptions = Object.assign({}, options)
    return loadImage(myOptions.url).then(img => {
      ctx.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh)
    })
  }
  
  myAddEventListener = (selector, clickableClass, bodyPart) => {
    document.querySelector(selector).addEventListener('click', function(e){
      if(e.target.classList.contains(clickableClass)){
        let canvas = document.querySelector('canvas')
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,200,200)
        bodyPart.url = e.target.src
        imgs.forEach(depict)
      }
    })
  }
  
  const canvas = document.querySelector('canvas')
  const getContext = () => canvas.getContext('2d')
  imgs.forEach(depict)

  myAddEventListener('.bodies', 'body-part', imgs[2])
  myAddEventListener('.arms', 'body-arm', imgs[0])
  myAddEventListener('.legs', 'body-part', imgs[1])
  myAddEventListener('.eyes', 'body-part', imgs[3])
  myAddEventListener('.mouths', 'body-part', imgs[4])
  myAddEventListener('.noses', 'body-part', imgs[5])
  // myAddEventListener('.textures', 'body-part', imgs[6])


  document.querySelector('#download-btn').addEventListener('click', function(e){
    let dataURL = canvas.toDataURL('image/png')
    e.target.href = dataURL
  })

  $('h3').click(function(e){
    $(e.target).siblings().toggleClass('hidden')
  })

  $('.colors').click(function(e){
    if (e.target.classList.contains('color-box')){
      
    }
    
    
  })

})