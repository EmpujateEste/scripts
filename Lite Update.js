var version = "0.1.0";        

	var ask = new Alert();
	ask.message = "Would you like to update your script?";
	ask.addAction("Yes");
	ask.addAction("No");
	var updaterFM = FileManager.iCloud();
        var updatedFile = updaterFM.readString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"));
        var updaterReq = new Request("https://raw.githubusercontent.com/EmpujateEste/scripts/main/Lite%20Update.js");
        var updaterOfficialCode = await updaterReq.loadString();
var v = updaterOfficialCode.match(/var version = (.+);/g)[0];
v = v.replace(/var version = |[\",;]/g,"");
var val = await ask.presentAlert();
	if(val == false){
        if(version != v ){
	         updaterFM.writeString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"), updaterOfficialCode);
        }else{
	         return;
        }}else{return}


var fm = FileManager.iCloud();

// Get Scripts
function getScripts(){
	var scripts = [];
	var s = fm.listContents(fm.documentsDirectory());
	s.forEach(name => {
	       if(name.endsWith(".js")){
			    scripts.push(name);
			}
	});
	return scripts;
}

var scripts = getScripts();

// Prompt to choose script
async function prompt(){
	var prmt = new Alert();
	scripts.forEach(script => {
		prmt.addAction(script);
	});
	prmt.addCancelAction("Cancel");
	var res = await prmt.presentSheet();
	return scripts[res];
}
var script = await prompt();

// New script
async function newScript(){
	var github = new Alert();
	github.message = "Please provide the raw github url below";
	github.addTextField("Here", "");
	github.addCancelAction("Cancel");
	github.addAction("OK");
	await github.presentAlert();
	var oString = fm.readString(fm.joinPath(fm.documentsDirectory(), script));

	var version = oString.match(/var version = (.+)\;/g)[0];
	var nScript = oString.slice(0,oString.indexOf(version) + version.length) + `        \n
	var ask = new Alert();
	ask.message = "Would you like to update your script?";
	ask.addAction("Yes");
	ask.addAction("No");
	var updaterFM = FileManager.iCloud();
        var updatedFile = updaterFM.readString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"));
        var updaterReq = new Request("${github.textFieldValue(0)}");
        var updaterOfficialCode = await updaterReq.loadString();
var v = updaterOfficialCode.match(/var version = (.+)\;/g)[0];
v = v.replace(/var version = |[\\",;]/g,"");
var val = await ask.presentAlert();
	if(val == false){
        if(version != v ){
	         updaterFM.writeString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"), updaterOfficialCode);
        }else{
	         return;
        }}else{return}\n` + oString.slice(oString.indexOf(version) + version.length);
return nScript;
	
}

var path = fm.joinPath(fm.documentsDirectory(), script);

fm.writeString(path, await newScript());
Script.complete();
