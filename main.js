var canvas = document.getElementById("myCanvas")
ctx = canvas.getContext("2d")
// satrt on center of display
let width = canvas.width/2
let height = canvas.height/2
let maxWv = 89
let maxHv = 44

const colorgen = () => {
    r = Math.floor(Math.random() * (256)),
    g = Math.floor(Math.random() * (256)),
    b = Math.floor(Math.random() * (256)),
    color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    return color
    }
const randomNum = (num) => {
    return Math.round(Math.random() * (num - (-num)) + (-num));
    }

const data = [
    {x: randomNum(maxWv), y: randomNum(maxHv), name: 1, color: colorgen()}
    ]


const find = () => {
    let ix = document.getElementById("ix").value
    let iy = document.getElementById("iy").value
    let sum = ""

    for(let i = 0; i< data.length; i++){
        
        if (ix == data[i].x && iy == data[i].y) {
            sum = sum + data[i].name + ", "
        }
    }
    if (sum == ""){
        alert("no points(")
    } else {
        alert("points id: " + sum)
    }
    
}

const setObjectsByXY = () => {
    let ix = document.getElementById("ix").value
    let iy = document.getElementById("iy").value
    let nx = document.getElementById("nx").value
    let ny = document.getElementById("ny").value
    let object = document.getElementById("objectnum").value

    if (object){
        data[object - 1].x = Number(nx)
        data[object - 1].y = Number(ny)

    } else {
        for(let i = 0; i< data.length; i++){
            if (ix == data[i].x && iy == data[i].y) {
                data[i].x = Number(nx)
                data[i].y = Number(ny)
            }
        }
    }   
    render()
}

const add = () => {
    let num = document.getElementById("points").value

    for(let i = 0; i <= Number(num); i++){
        let rndX = randomNum(maxWv)
        let rndY = randomNum(maxHv)
        let a = {x: rndX, y: rndY, name: data.length + 1, color: colorgen()}
        data.push(a)
    }
    
    console.log(data)
    render() //rerender with new points
}

const updateObjectXY = (moveX, moveY, object) => {
    if (moveX != Number(moveX) ){
        alert('введите число')
    } else{
        x = Number(moveX) 
        y = Number(moveY) 
        ob = Number(object) - 1

        if (object){
            data[ob].x = data[ob].x + x
            data[ob].y = data[ob].y + y

        } else {
        for (let i = 0; i< data.length; i++){
            data[i].x = data[i].x + x
            data[i].y = data[i].y + y
            }
        } 
    }
    
    render()
}
const inp = () => {
    let nx = document.getElementById("nx").value
    let ny = document.getElementById("ny").value
    let object = document.getElementById("objectnum").value
    updateObjectXY(nx, ny, object)
    }

const rotate = () => {
    let angle = document.getElementById("angle").value
    let startpointx = document.getElementById("startpointx").value
    let startpointy = document.getElementById("startpointy").value
    startpointx = Number(startpointx)
    startpointy = Number(startpointy)
    let chbox = document.getElementById('way')
    if (chbox.checked) {
		angle = 360 - angle;
	}
    setObjectAraund(startpointx, startpointy, angle)
    render()
}
const mirrorX = () => {
    let allX = document.getElementById("osx").value
    allX =  Number(allX)
    for (let i = 0; i< data.length; i++){
        if (allX < data[i].x){
            data[i].x = allX - (data[i].x - allX)
        } else {
            data[i].x = allX + (allX - data[i].x) 
        }
    }
    render()
}
const mirrorY = () => {
    let allY = document.getElementById("osy").value
    allY =  Number(allY)
    for (let i = 0; i< data.length; i++){

        
        if (allY < data[i].y){
            data[i].y = allY - (data[i].y - allY)
        } else {
            data[i].y = allY + (allY - data[i].y)
        }
    }
    render()
}

const setObjectAraund = (startpointx = 0, startpointy = 0, angle) => {
    let rad = angle*Math.PI/180

    for (let i = 0; i< data.length; i++){

        if (startpointx != 0 || startpointy != 0) { 
            console.log('ga')
            data[i].x = data[i].x - startpointx
            data[i].y = data[i].y - startpointy
            let da = data[i].x
            data[i].x = da * Math.cos(rad) - data[i].y * Math.sin(rad)
            data[i].y = data[i].y * Math.cos(rad) + da * Math.sin(rad)
            data[i].x = (data[i].x + startpointx).toFixed(3)
            data[i].y = (data[i].y + startpointy).toFixed(3)

        } else {
            let da = data[i].x
            data[i].x = da * Math.cos(rad) - data[i].y * Math.sin(rad)
            data[i].y = data[i].y * Math.cos(rad) + da * Math.sin(rad)
            data[i].x = Number(data[i].x.toFixed(3))
            data[i].y = Number(data[i].y.toFixed(3))
        }
    }
} 
    
const render = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height) //clear canvas
    ctx.font = "12px Arial"
    let step = 10
    let textstep = 50
    let wd = 50
    let hd = -95
        //вертикальные
    for (let i = step; i<canvas.width; i+=step){
        ctx.beginPath()
        ctx.strokeStyle = '#7a7979'
        ctx.lineWidth = 0.5
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
        ctx.closePath()
        }
        //Горизонтальные
    for (let i = step; i<canvas.height; i+=step){
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
        ctx.closePath()
        }
        // палочки и цифры вертикальные
    for (let i = 0; i<canvas.height; i+=textstep){
        wd = wd - 5 
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 1
        ctx.moveTo(canvas.width/2 , i)
        ctx.strokeRect(canvas.width/2 - 2, i, 4 , 1)
        if (wd != 0 ) {
            ctx.fillText(`${wd}`,canvas.width/2 + 5,i + 2)
        }
        ctx.stroke()
        ctx.closePath()
        }
        // палочки и цифры горизонтальные
    for (let i = 0; i<canvas.width; i+=textstep){
        hd = hd + 5 
        ctx.beginPath()
        ctx.moveTo(i, canvas.height/2)
        ctx.strokeRect(i, canvas.height/2 - 2 , 1, 4)
        if (hd == 0 ) {
            ctx.fillText(`${hd}`,i + 5, canvas.height/2 + 15)
        } else {
            ctx.fillText(`${hd}`,i - 4, canvas.height/2 + 15)
        }
        
        ctx.stroke()
        ctx.closePath()
        }
        // draw x, y lines 
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.moveTo(0, canvas.height/2)
        ctx.lineTo(canvas.width, canvas.height/2)
        ctx.strokeStyle = "black"
        ctx.moveTo(canvas.width / 2, 0)
        ctx.lineTo(canvas.width / 2, canvas.height)
        ctx.stroke()
        ctx.closePath()
        ctx.lineWidth = 2
        // draw poinst
        ctx.beginPath()
        data.map((map)=> {
        ctx.beginPath()
        ctx.font = "12px Arial"
        ctx.moveTo(map.x*10 + canvas.width/2, canvas.height/2 - map.y*10)
        ctx.fillText(map.name + ` x:${map.x},y:${map.y}`,map.x*10 + canvas.width/2 + 4, canvas.height/2 - map.y*10 + 2)
        ctx.strokeStyle = map.color
        ctx.arc(map.x*10 + canvas.width/2, canvas.height/2 - map.y*10,1,0, Math.PI*2,true)
        ctx.stroke()
        ctx.closePath()
    })
}
render()