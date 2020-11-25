let array = []

let Parameter = args.widgetParameter

console.log(Parameter)

let user = array[Math.floor(Math.random()*(array.length))]

console.log(user)

let userReq = new Request(`https://instagram.com/${user}?__a=1`)

let info = await userReq.loadJSON()

let userID = info.graphql.user.id

let posts = info.graphql.user.edge_owner_to_timeline_media.count

if(posts/12 >5){
	var num = 3
}else{
	var num = Math.trunc(posts/12)
}

var cursor = null

// QuickLook.present(image)
var imageURLs = []
for(i = 0;i<num;i++){
let url = new Request("https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables=%7B%22id%22%3A%22" + userID + "%22%2C%22first%22%3A12%2C%22after%22%3A" +  cursor + "%7D")


let json = await url.loadJSON()

cursor = "%22" + json.data.user.edge_owner_to_timeline_media.page_info.end_cursor + "%22"

let images = json.data.user.edge_owner_to_timeline_media.edges


images.forEach(image => imageURLs.push(image.node))
}
let pnum = Math.floor(Math.random()*(imageURLs.length-0))

let postUrl = "https://instagram.com/p/" + imageURLs[pnum].shortcode

console.log(postUrl)

let img = imageURLs[pnum].display_url

let bgReq = new Request(img)

let bgImage = await bgReq.loadImage()

let imgSize = bgImage.size

let width = 758

let height = parseInt((width/imgSize.width)*imgSize.height)

let drawing = new DrawContext()

drawing.size = new Size(width,height)

let dImage = drawing.drawImageInRect(bgImage, new Rect(0, 0, width, height))

let fImage = drawing.getImage()

let widget = new ListWidget()

widget.backgroundImage = fImage

widget.url = postUrl

widget.presentLarge()

Script.setWidget(widget)
