// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
var fm = FileManager.iCloud();

// Get Scripts(except this one)
function getScripts(){
	var scripts = [];
	var s = fm.listContents(fm.documentsDirectory());
	s.forEach(name => {
	       if(name.endsWith(".js")){
			    scripts.push(name);
			}
	});
scripts.splice(scripts.indexOf(Script.name() + ".js"),1);
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
	var updaterFM = FileManager.iCloud();
        var updatedFile = updaterFM.readString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"));
        var updaterReq = new Request("${github.textFieldValue(0)}");
        var updaterOfficialCode = await updaterReq.loadString();
var v = updaterOfficialCode.match(/var version = (.+)\;/g)[0];
v = v.replace(/var version = |[\\",;]/g,"");
        if(version != v ){
	         updaterFM.writeString(updaterFM.joinPath(updaterFM.documentsDirectory(),Script.name() + ".js"), updaterOfficialCode);
        }else{
	         return;
        }\n` + oString.slice(oString.indexOf(version) + version.length);
return nScript;
	
}

var path = fm.joinPath(fm.documentsDirectory(), script);

fm.writeString(path, await newScript());
Script.complete();
