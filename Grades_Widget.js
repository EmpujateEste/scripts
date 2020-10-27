let username = ""
let password = ""

let fm = FileManager.iCloud()

let dir = fm.documentsDirectory()

let path = fm.joinPath(dir, 'htmlGrades.txt')

let url = "https://focusk12.polk-fl.net/focus/index.php"
let r = new Request(url)

// Method is POST (you are trying to login)
r.method = "POST"

//  Form Data
r.addParameterToMultipart("login", "true")
r.addParameterToMultipart("data", `username=${username}&password=${password}`)
// Response is in JSON
console.log(await r.loadJSON())

let g = new Request('https://focusk12.polk-fl.net/focus/Modules.php?modname=misc/Portal.php')

g.method = "GET"

// Output
let body = await g.loadString()

let regx = /(mp\_grade":"NG|(mp\_grade.{3}(\d+)%\s\w))/g
let array = []
if(regx.exec(body)){
	let gs = body.match(regx)
	gs.forEach(grade => {
		array.push(grade.match(/(\w+|(\d+)%\s\w)/g))
	})
	fm.writeString(path, body)
}else{
	let html = fm.readString(path)
	let gs = html.match(regx)
	gs.forEach(grade => {
		array.push(grade.match(/(\d+)(%)([A-Z])/g))
	})
}
if(array[0].includes('NG')){
	array = ["NG","NG","NG","NG","NG","NG"]
}
	console.log(array)
let logout = new Request('https://focusk12.polk-fl.net/focus/index.php?logout')

let lo = await logout.load()

let classArr = ['https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1214014&side_school=965&side_mp=60575','https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1213075&side_school=965&side_mp=60575', 'https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1213053&side_school=965&side_mp=60575', 'https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1270050&side_school=965&side_mp=60575','https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1213394&side_school=965&side_mp=60575','https://focusk12.polk-fl.net/focus/Modules.php?modname=Grades/StudentGBGrades.php&force_package=SIS&student_id=5300779846&course_period_id=1269995&side_school=965&side_mp=60575']
var f
var h
var pc = []
for(let x = 0;x<6;x++){
	 await r.load()
    f = new Request(classArr[x])
    h = await f.loadString()
    pc.push(h.match(/(\d+|\d+\.\d+)(\s\/\s\d+)/g))
    
    
}
var points = [[],[],[],[],[],[]]
for(let g = 0;g<6;g++){
pc[g].forEach(percent => {
		let prt = percent.match(/\s\d+/g)
		points[g].push(parseInt(prt[0].split(' ').join('')))
		
})
}
var denominator = [[],[],[],[],[],[]]
for(let d = 0;d<6;d++){
	denominator[d].push(Math.round(eval((1-(parseInt(array[d][0].substring(0,2))/100)) * points[d].reduce(function(a,b){return a+b}))))
}
console.log(String(denominator[0][0]))
let widget = new ListWidget()
if(String(denominator[0][0]) == "NaN"){
	denominator = ["0","0","0","0","0","0"]
}
console.log(denominator)
widget.setPadding(0, 70, 0, 0)

widget.backgroundColor = new Color('#1d1d1d')

let sub = ['Psychology','Physics','Art','U.S. Gov','Math','English']

let i = 0

let wgrades = []
let wpoints = []
let gStack = widget.addStack()
let stack1 = gStack.addStack()
let stack2 = gStack.addStack()
for(let i=0;i<6;i++){
	wgrades[i] = stack1.addText(sub[i] + ': ' + array[i])
	wgrades[i].centerAlignText()
	wgrades[i].font = new Font('Helvetica', 15)
	wgrades[i].textColor = Color.white()
	wpoints[i] = stack2.addText(denominator[i] + ' more points')
	wpoints[i].centerAlignText()
	wpoints[i].font = new Font('Helvetica', 15)
	wpoints[i].textColor = Color.white()
}
gStack.size = new Size(360, 170)
gStack.layoutHorizontally()
stack1.size = new Size(180, 170)
stack1.layoutVertically()
stack1.centerAlignContent()
stack2.size = new Size(180, 170)
stack2.layoutVertically()
stack2.centerAlignContent()
stack1.url = url
stack2.url = url
let present = false
if(present == true){
	widget.presentMedium()
}else{}

Script.setWidget(widget)
Script.complete()
