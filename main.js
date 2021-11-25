// Canvas
const canvas = document.querySelector("#canvas")
const context = canvas.getContext("2d")

// Resize
function render() {
    canvas.width = window.innerWidth-400
    canvas.height = window.innerHeight-300
    if(window.innerWidth <= 700) {
        canvas.width = window.innerWidth
    }
}

// Listen for changing without reload
window.addEventListener("resize", render)
// Update for browser refresh
window.addEventListener("load", render)

// Variables
let painting = false

// Functions
function startPosition(p) {
    painting = true
    paint(p)
}

function endPosition() {
    painting = false
    context.beginPath()
}

function paint(p) {
    if(!painting) return
    context.lineCap = 'round'
    context.lineTo(p.clientX, p.clientY)
    context.stroke()
    context.beginPath()
    context.moveTo(p.clientX, p.clientY)
}
// Event Listeners
canvas.addEventListener("mousedown", startPosition)
canvas.addEventListener("mouseup", endPosition)
canvas.addEventListener("mousemove", paint)

// Color changer
document.getElementById("colorpicker").addEventListener('change', function() {
    context.strokeStyle = document.getElementById("colorpicker").value
}, false)

// Stroke changer
document.getElementById("strokeSize").addEventListener('change', function() {
    context.lineWidth = document.getElementById("strokeSize").value
}, false)

// Clear
document.getElementById("clear").addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
})

// Download / Save
function downloadCanvas() {
    let downloadLink = document.createElement('a')
    downloadLink.setAttribute('download', 'CanvasImg.png')
    let dataURL = canvas.toDataURL('image/png')
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream')
    downloadLink.setAttribute('href', url)
    downloadLink.click()
}


// Upload Image
let upload = document.getElementById("upload")
function uploadImage() {
    let img = new Image()
    img.onload = drawImage
    img.src = URL.createObjectURL(this.files[0])
}

function drawImage() {
    let width = canvas.width/2
    let height = canvas.height/2
    context.drawImage(this, 0,0,width, height)
}
upload.addEventListener('change', uploadImage)


