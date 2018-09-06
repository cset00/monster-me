console.log('hello')

let imgs = [
  { url: 'body/orange-legs-15.png', x: 67, y: 190, sw: 150, sh: 150 },
  { url: 'body/orange-arms-65.png', x: 25, y: 110, sw: 240, sh: 160 },
  { url: 'body/orange-body-02.png', x: 45, y: 55, sw: 200, sh: 200 },
  { url: 'body/eyes-48.png', x: 88, y: 40, sw: 110, sh: 110 },
  { url: 'body/mouth-25.png', x: 100, y: 70, sw: 90, sh: 90 }
];

// let config = {
//   'positions': {
//     'legs': {x: 67, y: 190, sw: 150, sh: 150 },
//   },
//   'legs': [
//     'body/orange-legs-12.png',
//     'body/orange-legs-13.png',
//     'body/orange-legs-11.png',
//     'body/orange-legs-16.png'
//   ]
// };

// let selections = {
//   'l': 1,
//   'a': 4,
//   'b': 0,
//   'e': 2,
//   'm': 3,
// }


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
  
  fillWhite = () => {
    let canvas = document.querySelector('canvas')
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,300,300)
  }

  myAddEventListener = (selector, clickableClass, bodyPart) => {
    document.querySelector(selector).addEventListener('click', function(e){
      if(e.target.classList.contains(clickableClass)){
        fillWhite()
        bodyPart.url = e.target.src
        imgs.forEach(depict)
      }
    })
  }
  
  const canvas = document.querySelector('canvas')
  const getContext = () => canvas.getContext('2d')
  imgs.forEach(depict)
  // depict(imgs[0])

  canvas.width = 300
  canvas.height = 300

  myAddEventListener('.bodies', 'body-part', imgs[2])
  myAddEventListener('.arms', 'body-arm', imgs[1])
  myAddEventListener('.legs', 'body-part', imgs[0])
  myAddEventListener('.eyes', 'body-part', imgs[3])
  myAddEventListener('.mouths', 'body-part', imgs[4])


  toggleClassHide = e => {
    $('.sibling').not(this).each(function(){
      $(this).addClass('hidden')
    })
    $(e.target).parent().find('.sibling').toggleClass('hidden')
  }

  document.querySelector('#download-btn').addEventListener('click', function(e){
    let dataURL = canvas.toDataURL('image/png')
    e.target.href = dataURL
  })

  // params: array, color
  updateColor = (arr, color) => {
    Array.from(arr).forEach(item => {
      let splitArr = item.src.split('/')
      let link = splitArr[splitArr.length-1].split('-')
      link[0] = color
      item.src = `body/${link.join('-')}`
    })
  }

  //params: color, 
  renderNewColor = async color => {
    imgs.forEach(bodypart => {
      let splitArr = bodypart.url.split('/')
      let link = splitArr[splitArr.length-1].split('-')
      if (link.length === 3){
        link[0] = color
        bodypart.url = `body/${link.join('-')}`
      }
    })
    
    fillWhite()
    // imgs.forEach(depict)
    await depict(imgs[0])
    await depict(imgs[1])
    await depict(imgs[2])
    await depict(imgs[3])
    await depict(imgs[4])
  }


  changeBodypartsColor = e => {
    // array of imgs i want to change the src link
    
    let bodyArr = $('.bodies').find('.sibling').find('.body-part').slice(0,10)
    let armsArr = $('.arms').find('.sibling').find('.body-arm')
    let legsArr = $('.legs').find('.sibling').find('.body-part').slice(0,10)
    let eyesArr = $('.eyes').find('.sibling').find('.chg')
    
    if (e.target.classList.contains('color-box')){
      if (e.target.classList.contains('purple')){
        
        updateColor(bodyArr, 'purple')
        updateColor(armsArr, 'purple')
        updateColor(legsArr, 'purple')
        updateColor(eyesArr, 'purple')
        
        renderNewColor('purple')
        
        
      } else if (e.target.classList.contains('orange')){
        document.querySelector('.color-box.orange').click()
        updateColor(bodyArr, 'orange')
        updateColor(armsArr, 'orange')
        updateColor(legsArr, 'orange')
        updateColor(eyesArr, 'orange')
        
        renderNewColor('orange')
        document.querySelector('.color-box.orange').click()

      } else if (e.target.classList.contains('green')){
        document.querySelector('.color-box.green').click()
        updateColor(bodyArr, 'green')
        updateColor(armsArr, 'green')
        updateColor(legsArr, 'green')
        updateColor(eyesArr, 'green')
        
        renderNewColor('green')
        document.querySelector('.color-box.green').click()
        
      } else {
        document.querySelector('.color-box.pink').click()
        updateColor(bodyArr, 'pink')
        updateColor(armsArr, 'pink')
        updateColor(legsArr, 'pink')
        updateColor(eyesArr, 'pink')
        
        renderNewColor('pink')
        document.querySelector('.color-box.pink').click()
        
      }
    }
  }

  $('h3').click(toggleClassHide)
  $('.colors').click(changeBodypartsColor)
  




})