console.log('hello')

let imgs = [
  { url: 'body/arms-65.png', x: 25, y: 110, sw: 240, sh: 160 },
  { url: 'body/legs-15.png', x: 67, y: 190, sw: 150, sh: 150 },
  { url: 'body/body-02.png', x: 45, y: 55, sw: 200, sh: 200 },
  { url: 'body/eyes-48.png', x: 88, y: 40, sw: 110, sh: 110 },
  { url: 'body/mouth-25.png', x: 100, y: 70, sw: 90, sh: 90 }
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
        ctx.fillRect(0,0,300,300)
        bodyPart.url = e.target.src
        imgs.forEach(depict)
      }
    })
  }
  
  const canvas = document.querySelector('canvas')
  const getContext = () => canvas.getContext('2d')
  imgs.forEach(depict)

  canvas.width = 300
  canvas.height = 300

  myAddEventListener('.bodies', 'body-part', imgs[2])
  myAddEventListener('.arms', 'body-arm', imgs[0])
  myAddEventListener('.legs', 'body-part', imgs[1])
  myAddEventListener('.eyes', 'body-part', imgs[3])
  myAddEventListener('.mouths', 'body-part', imgs[4])



  document.querySelector('#download-btn').addEventListener('click', function(e){
    let dataURL = canvas.toDataURL('image/png')
    e.target.href = dataURL
  })

  $('h3').click(function(e){
    $(e.target).parent().find('.sibling').toggleClass('hidden')
  })

  // $('.colors').click(function(e){
  //   if (e.target.classList.contains('color-box')){
  //     // color tinting
  //     // console.log(window.getComputedStyle(e.target, null).getPropertyValue('background-color'))
  //     let colorrr = window.getComputedStyle(e.target, null).getPropertyValue('background-color')
  //     let canvas = document.querySelector('canvas')
  //     let ctx = canvas.getContext('2d')
  //     ctx.fillStyle = colorrr
  //     ctx.globalCompositeOperation = 'source-in'
  //     ctx.fillRect(0,0,200,200)
  //     // eyesmouth.forEach(depict)

  //     // ctx.drawImage(imgs[2], 22, 0, 100, 100)
  //     // ctx.drawImage(imgs[3], 50, 40, 50, 50)
      
      
  //   }
    
   
  // })

})