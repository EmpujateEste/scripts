let key = '';


// USER INFO
let fm = FileManager.iCloud();
let path = fm.joinPath(fm.documentsDirectory(), 'r6userData.txt');


if(fm.fileExists(path)){
	let userData = JSON.parse(fm.readString(path));
	console.log(userData.pltf)
	var username = userData.name
	var platform = userData.pltf
}else{
	let usr = new Alert();
	usr.addTextField("", "");
	usr.message = "Enter Username Below";
	usr.addAction("OK");
	await usr.presentAlert();
	var username = usr.textFieldValue(0);
	let pltf = new Alert();
	let pltfs = ["ps4","pc","xbox"];
	pltf.addAction("ps4");
	pltf.addAction("pc");
	pltf.addAction("xbox");
	var platform = pltfs[await pltf.presentAlert()];
	fm.writeString(path, `{"name":"${username}","pltf":"${platform}"}`);
}

let req = new Request(`https://api2.r6stats.com/public-api/stats/${username}/${platform}/seasonal`);

myHeaders = {
	
	Authorization: `Bearer ${key}`
	
}

req.headers = myHeaders;

let gReq = new Request(`https://api2.r6stats.com/public-api/stats/${username}/ps4/generic`);

gReq.headers = myHeaders;

let Gjson = await gReq.loadJSON();

let Sjson = await req.loadJSON();

let seasons = [];
let obj = Sjson.seasons;
for(var x in obj){
	if(obj.hasOwnProperty(x)){
		seasons.push(x);
	}
}


let seconds = [];

// GET THE CURRENT SEASON NAME
seasons.forEach(season => {
	
	let d1 = new Date(Sjson.seasons[season].start_date)
	let d2 = new Date(Date.now())
	seconds.push(d2-d1);
	
})
let season_index = 0;
let s = seconds[0];
for(var i = 1;i < seconds.length;i++){
	
	if(seconds[i] < s){
		season_index = i;
		s = seconds[i];
	}
		
}


let current_season = Sjson.seasons[seasons[season_index]].regions.ncsa[0];

let stats = {
	
	rank:current_season.rank_text,
	rank_image:current_season.rank_image,
	level:Gjson.progression.level,
	kd:Gjson.stats.queue.ranked.kd,
	neededMMR:current_season.next_rank_mmr-current_season.mmr,	nGames:Math.ceil((current_season.next_rank_mmr-current_season.mmr)/Math.abs(current_season.last_match_mmr_change))
	
		
}

let imgR = new Request(String(stats.rank_image).replace("ranks","rank-imgs").replace("svg", "png"));

let rankImg = await imgR.loadImage();

let drawing = new DrawContext();

drawing.opaque = false;

drawing.size = new Size(720, 338);

drawing.drawImageInRect(rankImg,new Rect(420,10,300,300));

let background = drawing.getImage();



// CREATING THE WIDGET



let w = new ListWidget();

w.backgroundImage = background;
w.backgroundColor = new Color('#1d1d1d');

let lText = w.addText(`Level: ${stats.level}`);
w.addSpacer(10);
let kd = w.addText(`K/D: ${stats.kd}`);
w.addSpacer(10);
let nMMR = w.addText(`MMR for next Rank: ${stats.neededMMR}`);
w.addSpacer(10);
let nGames = w.addText(`Needed Games ≈ ${stats.nGames}`);

Script.setWidget(w);
