function getBatteryLevel() {
    const batteryLevel = Device.batteryLevel()
    const batteryAscii = "" + Math.round(batteryLevel * 100) + "%"; 
    return batteryAscii;
  
// Battery Status
var battery = "" + getBatteryLevel();
if(Device.isCharging() && !Device.isFullyCharged()){
  battery = battery + ", Charging...";
}
if(Device.isFullyCharged()){
  battery = battery +", Fully Charged. Please unplug.";
}
let batterytext = widgetHello.addText(battery);
batterytext.font = Font.regularSystemFont(20);
batterytext.textColor = themeColor;base_path
}
bat = Device.batteryLevel()*100

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: image;
if(bat > 50){
	var btColor = Color.white()
}else if(50 < bat < 25){
	var btColor = Color.yellow()
}else{
	var btColor = Color.red()
}
	var sfBat = "0"
	var tint = Color.gray()
	var level = 33*Device.batteryLevel()

/*
 * Change the widget settings and test out the widget in this section.
 * ===================================================================
 */

/* -- PREVIEW YOUR WIDGET -- */

// Change to true to see a preview of your widget.
const testMode = true

// Optionally specify the size of your widget preview.
const widgetPreview = "medium"

/* -- GREETING AND DATE -- */

// Optionally show a greeting based on the time of day.
const showGreeting = true

// Choose the date style. "iOS" matches the default calendar app (like: THURSDAY 29)
// Or, use docs.scriptable.app/dateformatter to write your own format.
const dateDisplay = "EEEE, MMMM d"

/*-- WEATHER --*/

//Create your ID on openweathermap and get an API_KEY from there and update API_WEATHER
//Due to limitation with scriptable auto update location not possible. So get the city ID for your location. 
//Use web address to get your location City ID ---> https://gist.github.com/sharn25/3f62e1969d7eaec22bd6b5f923651a0d  
//Get your city ID use link by putting your longitude, latitude and API_KEY ---> http://api.openweathermap.org/data/2.5/weather?lat=19.034103202555187&lon=73.07745084021239&appid=API_KEY&units=metric
//Update CITY_WEATHER with City ID

// API Key and City Code
let API_WEATHER = '';//Load Your api here
let CITY_WEATHER = '';//add your city ID

//Get storage
var base_path = "/var/mobile/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/weather/";
var fm = FileManager.iCloud();

// Fetch Image from Url
async function fetchimageurl(url) {
	const request = new Request(url)
	var res = await request.loadImage();
	return res;
}

// Load image from local drive
async function fetchimagelocal(path){
  var finalPath = base_path + path + ".png";
  if(fm.fileExists(finalPath)==true){
	
	return finalPath;
  }else{
	//throw new Error("Error file not found: " + path);
	if(fm.fileExists(base_path)==false){
	  console.log("Directry not exist creating one.");
	  fm.createDirectory(base_path);
	}
	console.log("Downloading file: " + finalPath);
	await downloadimg(path);
	if(fm.fileExists(finalPath)==true){
	  console.log("file exists after download: " + finalPath);
	  return finalPath;
	}else{
	  throw new Error("Error file not found: " + path);
	}
  }
}

// Weather icons





//get Json weather



// Get Location 
/*Location.setAccuracyToBest();
let curLocation = await Location.current();
console.log(curLocation.latitude);
console.log(curLocation.longitude);*/

// use "&units=imperial" for Farenheit or "&units=metric" for Celcius
let wetherurl = "http://api.openweathermap.org/data/2.5/weather?q=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=imperial";
var req = new Request(wetherurl)

//"http://api.openweathermap.org/data/2.5/weather?lat=" + curLocation.latitude + "&lon=" + curLocation.longitude + "&appid=" + API_WEATHER + "&units=metric";
//"http://api.openweathermap.org/data/2.5/weather?id=" + CITY_WEATHER + "&APPID=" + API_WEATHER + "&units=metric"

const weatherJSON = await req.loadJSON();
const cityName = weatherJSON.name;
const weatherarry = weatherJSON.weather;
const iconData = weatherarry[0].icon;
const weathername = weatherarry[0].main;
const curTempObj = weatherJSON.main;
const curTemp = curTempObj.temp;
const highTemp = curTempObj.temp_max;
const lowTemp = curTempObj.temp_min;
const feel_like = curTempObj.feels_like;
//Completed loading weather data
	switch (iconData){
	  case "01d":
		imgurl = SFSymbol.named("sun.max.fill").image;
	  break;
	  case "01n":
		imgurl = SFSymbol.named("moon.fill").image;
	  break;
	  case "02d":
		imgurl = SFSymbol.named("cloud.sun.fill").image;
	  break;
	  case "02n":
		imgurl = SFSymbol.named("cloud.moon.fill").image;
	  break;
	  case "03d":
		imgurl = SFSymbol.named("cloud.sun.fill").image;
	  break;
	  case "03n":
		imgurl = SFSymbol.named("cloud.moon.fill").image;
	  break;
	  case "04d":
		imgurl = SFSymbol.named("cloud").image;
	  break;
	  case "04n":
		imgurl = SFSymbol.named("cloud.fill").image;
	  break;
	  case "09d":
		imgurl = dataimg._09d;
	  break;
	  case "09n":
		imgurl = dataimg._09n;
	  break;
	  case "10d":
		imgurl = SFSymbol.named("cloud.sun.rain.fill").image;
	  break;
	  case "10n":
		imgurl = SFSymbol.named("cloud.moon.rain.fill").image;
	  break;
	  case "11d":
		imgurl = SFSymbol.named("cloud.sun.bolt.fill").image;
	  break;
	  case "11n":
		imgurl = dataimg._11n;
	  break;
	  case "13d":
		imgurl = dataimg._13d;
	  break;
	  case "13n":
		imgurl = dataimg._13n;
	  break;
	  case "50d":
		imgurl = SFSymbol.named("cloud.fog.fill").image;
	  break;
	  case "50n":
		imgurl = SFSymbol.named("cloud.fog.fill").image;
	  break;
	}
	const image = imgurl
	

/* -- EVENTS -- */

// Change to false to hide events.
const showEvents = false

// Choose whether to show all-day events.
const showAllDay = false

// Specify how many events to show.
const numberOfEvents = 3

// Optionally show tomorrow's events.
const showTomorrow = true

// Write a message when there are no events, or change to "" for blank.
const noEventMessage = "Enjoy the rest of your day."


/* -- SPACING -- */

// Can be top, middle, or bottom.
const verticalAlignment = "top"

// Can be left, center, or right.
const horizontalAlignment = "center"

// The spacing between each element. 
const elementSpacing = 12

/* -- FONTS AND TEXT -- */

// Use iosfonts.com, or change to "" for the system font.
const fontName = "Avenir-Light"

// Find colors on htmlcolorcodes.com
const fontColor = new Color("#ffffff")

// Change the font sizes for each element.
const greetingSize = 28
const dateSize = 18
const dayOfWeekSize = 12
const eventTitleSize = 12
const eventTimeSize = 10
const noEventMessageSize = 10

/* -- RESET YOUR WIDGET -- */

// Change to true to reset the widget background.
const resetWidget = true

/*
 * The code below this comment is the widget logic - a bit more complex.
 * =====================================================================
 */

/* -- GLOBAL VALUES -- */

// Widgets are unique based on the name of the script.
const filename = Script.name() + ".jpg"
const files = FileManager.iCloud()
const path = files.joinPath(files.documentsDirectory(), filename)
const fileExists = files.fileExists(path)
var grrr = files.readImage(path)
var draw = new DrawContext();

draw.size = new Size(720, 338);

draw.drawImageInRect(grrr, new Rect(0, 0, 720, 338))

draw.setFillColor(btColor);

let pt = new Path();
pt.addRoundedRect(new Rect(127.5, 279, level, 13), 2, 2);

draw.addPath(pt);

draw.fillPath();

if(Device.isCharging()){
	let bolt = SFSymbol.named('bolt.fill').image
	
	bolt.size = new Size(32, 13)
	draw.drawImageInRect(bolt, new Rect(0, 0, 720, 338))
}

var bgImage = draw.getImage();

// Store other global values.
const date = new Date()
let widget = new ListWidget()
widget.url = "https://sololearn.com"
  widget.backgroundImage = bgImage
// If we're in the widget or testing, build the widget.
  widget.addSpacer(5);
if (config.runsInWidget || (testMode && fileExists && !resetWidget)) {
widget.backgroundColor = Color.black();
//   widget.backgroundImage = await transparent('main')

  if (verticalAlignment == "middle" || verticalAlignment == "middle") {

  }

  // Format the greeting if we need it.
  if (showGreeting) {
    let greetingText = makeGreeting()
    let greeting = widget.addText(greetingText)
    formatText(greeting, greetingSize)
    widget.addSpacer(5)
  }

  // Format the date info.
  let df = new DateFormatter()
  if (dateDisplay.toLowerCase() == "ios") {
    df.dateFormat = "EEEE"
    let dayOfWeek = widget.addText(df.string(date).toUpperCase())
    let dateNumber = widget.addText(date.getDate().toString())

    formatText(dayOfWeek, dayOfWeekSize)
    formatText(dateNumber, dateSize)
  } else {
    df.dateFormat = dateDisplay
    let dateText = widget.addText(df.string(date))
    formatText(dateText, dateSize)
  }
  
  //Spacing between date and summary
  widget.addSpacer(5);

  // Widget feel temp and summary
  //Use "u\2103" to show degrees celcius and "u\2109" to show degrees farenheit
let feel = weathername + " today" + "." + " It feels like " + Math.round(feel_like) + "\u00B0" + ";" + " the high will be " + Math.round(highTemp) + "\u00B0";//"H:"+highTemp+"\u00B0"+" L:"+lowTemp+"\u00B0"
var hltemptext = widget.addText(feel);
hltemptext.textColor = fontColor;
hltemptext.font = Font.regularSystemFont(12);
hltemptext.centerAlignText();
hltemptext.textOpacity = (0.5);
let txt = "____________________________"
let divide = widget.addText(txt);
divide.centerAlignText()
widget.addSpacer(10)
//define horizontal stack
let hStack = widget.addStack();
hStack.layoutHorizontally();
hStack.centerAlignContent();
// Centers weather line
hStack.addSpacer(45)
let sf = hStack.addImage(SFSymbol.named('battery.' + sfBat).image);
sf.imageSize = new Size(25,12)
sf.tintColor = tint
hStack.addSpacer(5)
//icon image
let btLevel = hStack.addText(getBatteryLevel());
btLevel.font = Font.regularSystemFont(20);
btLevel.textColor = fontColor;
//temptext.textOpacity = (0.5);
btLevel.centerAlignText();

let cal = CalendarEvent.thisWeek()

hStack.addSpacer(90)

var img = imgurl
 
//image in stack
let widgetimg = hStack.addImage(img);
widgetimg.imageSize = new Size(25, 25);
widgetimg.centerAlignImage();
widgetimg.tintColor = Color.white()
//tempeture label in stack
let temptext = hStack.addText('\xa0\xa0'+ Math.round(curTemp).toString()+"\u00B0");
temptext.font = Font.regularSystemFont(20);
temptext.textColor = fontColor;
//temptext.textOpacity = (0.5);
temptext.centerAlignText();

  
  // Add events if we're supposed to.
  if (showEvents) {

    // Determine which events to show, and how many.
    const todayEvents = await CalendarEvent.thisWeek([])
    let shownEvents = 0
    
    for (const event of todayEvents) {
      if (shownEvents == numberOfEvents) {
        break
      }
      if (shouldShowEvent(event)) {
        displayEvent(widget, event)
        shownEvents++
      }
    }

    // If there's room and we need to, show tomorrow's events.
    let multipleTomorrowEvents = true
    if (showTomorrow && shownEvents < numberOfEvents) {

      const tomorrowEvents = await CalendarEvent.tomorrow([])

      for (const event of tomorrowEvents) {
        if (shownEvents == numberOfEvents) {
          break
        }
        if (shouldShowEvent(event)) {
          // Add the tomorrow label prior to the first tomorrow event.
          if (!multipleTomorrowEvents) {
            widget.addSpacer(elementSpacing)
            let tomorrowText = widget.addText("TOMORROW")
            formatText(tomorrowText, eventTitleSize)
            multipleTomorrowEvents = true
          }
          
          // Show the tomorrow event and increment the counter.
          displayEvent(widget, event)
          shownEvents++
        }
      }

    }

    // If there are no events and we have a message, display it.
    if (shownEvents == 0 && noEventMessage != "Enjoy the rest of your day." && noEventMessage != null) {

      widget.addSpacer(elementSpacing)

      let noEvents = widget.addText(noEventMessage)
      formatText(noEvents, noEventMessageSize)
    }
  }

  if (verticalAlignment == "top" || verticalAlignment == "middle") {
    widget.addSpacer()
  }

  Script.setWidget(widget)
  if (testMode) {
    let widgetSizeFormat = widgetPreview.toLowerCase()
    if (widgetSizeFormat == "small")  { widget.presentSmall()  }
    if (widgetSizeFormat == "medium") { widget.presentMedium() }
    if (widgetSizeFormat == "large")  { widget.presentLarge()  }
  }
  Script.complete()

// If we're running normally, go to the calendar.
} else if (fileExists && !resetWidget) {

  const appleDate = new Date('2001/01/01')
  const timestamp = (date.getTime() - appleDate.getTime()) / 1000
  const callback = new CallbackURL("calshow:" + timestamp)
  callback.open()
  Script.complete()

// If it's the first time it's running, set up the widget background.
} else {

  // Determine if user has taken the screenshot.
  var message
  message = "Before you start, go to your home screen and enter wiggle mode. Scroll to the empty page on the far right and take a screenshot."
  let exitOptions = ["Continue", "Exit to Take Screenshot"]
  let shouldExit = await generateAlert(message, exitOptions)
  if (shouldExit) return

  // Get screenshot and determine phone size.
  let img = await Photos.fromLibrary()
  let height = img.size.height
  let phone = phoneSizes()[height]
  if (!phone) {
    message = "It looks like you selected an image that isn't an iPhone screenshot, or your iPhone is not supported. Try again with a different image."
    await generateAlert(message, ["OK"])
    return
  }

  // Prompt for widget size and position.
  message = "What size of widget are you creating?"
  let sizes = ["Small", "Medium", "Large"]
  let size = await generateAlert(message, sizes)
  let widgetSize = sizes[size]

  message = "What position will it be in?"
  message += (height == 1136 ? " (Note that your device only supports two rows of widgets, so the middle and bottom options are the same.)" : "")

  // Determine image crop based on phone size.
  let crop = { w: "", h: "", x: "", y: "" }
  if (widgetSize == "Small") {
    crop.w = phone.small
    crop.h = phone.small
    let positions = ["Top left", "Top right", "Middle left", "Middle right", "Bottom left", "Bottom right"]
    let position = await generateAlert(message, positions)

    // Convert the two words into two keys for the phone size dictionary.
    let keys = positions[position].toLowerCase().split(' ')
    crop.y = phone[keys[0]]
    crop.x = phone[keys[1]]

  } else if (widgetSize == "Medium") {
    crop.w = phone.medium
    crop.h = phone.small

    // Medium and large widgets have a fixed x-value.
    crop.x = phone.left
    let positions = ["Top", "Middle", "Bottom"]
    let position = await generateAlert(message, positions)
    let key = positions[position].toLowerCase()
    crop.y = phone[key]

  } else if (widgetSize == "Large") {
    crop.w = phone.medium
    crop.h = phone.large
    crop.x = phone.left
    let positions = ["Top", "Bottom"]
    let position = await generateAlert(message, positions)

    // Large widgets at the bottom have the "middle" y-value.
    crop.y = position ? phone.middle : phone.top
  }

  // Crop image and finalize the widget.
  let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))
  files.writeImage(path, imgCrop)
  message = "Your widget background is ready. If you haven't already granted Calendar access, it will pop up next."
  await generateAlert(message, ["OK"])

  // Make sure we have calendar access.
  await CalendarEvent.today([])
  Script.complete()
}

/*
 * Helper functions
 * ================
 */

// Return a greeting based on the time of day. Courtesy of riverwolf.
function makeGreeting() {
  let greeting = "Good "
  if (date.getHours() < 6) {
    greeting = greeting + "Night"
  } else if (date.getHours() < 12) {
    greeting = greeting + "Morning"
  } else if (date.getHours() < 17) {
    greeting = greeting + "Afternoon"
  } else if (date.getHours() < 21) {
    greeting = greeting + "Evening"
  } else {
    greeting = "Go To Sleep!"
  }
  return greeting
}

// Determine if an event should be shown.
function shouldShowEvent(event) {

  // Hack to remove canceled Office 365 events.
  if (event.title.startsWith("Canceled:")) {
    return false
  }

  // If it's an all-day event, only show if the setting is active.
  if (event.isAllDay) {
    return showAllDay
  }

  // Otherwise, return the event if it's in the future.
  return (event.startDate.getTime() > date.getTime())
}

// Provide the specified font.
function provideFont(fontName, fontSize) {
  if (fontName == "" || fontName == null) {
    return Font.regularSystemFont(fontSize)
  } else {
    return new Font(fontName, fontSize)
  }
}

// Add an event to the widget.
function displayEvent(widget, event) {
  widget.addSpacer(elementSpacing)

  let title = widget.addText(event.title)
  formatText(title, eventTitleSize)

  // If it's an all-day event, we don't need a time.
  if (event.isAllDay) { return }

  widget.addSpacer(7)

  let time = widget.addText(formatTime(event.startDate))
  formatText(time, eventTimeSize)
}

// Formats the times under each event.
function formatTime(date) {
  let df = new DateFormatter()
  df.useNoDateStyle()
  df.useShortTimeStyle()
  return df.string(date)
}

// Format text based on the settings.
function formatText(textItem, fontSize) {
  textItem.font = provideFont(fontName, fontSize)
  textItem.textColor = fontColor
  if (horizontalAlignment == "right") {
    textItem.rightAlignText()
  } else if (horizontalAlignment == "center") {
    textItem.centerAlignText()
  } else {
    textItem.centerAlignText()
  }
}

// Determines if two dates occur on the same day
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

// Generate an alert with the provided array of options.
async function generateAlert(message, options) {

  let alert = new Alert()
  alert.message = message

  for (const option of options) {
    alert.addAction(option)
  }

  let response = await alert.presentAlert()
  return response
}

// Crop an image into the specified rect.
function cropImage(img, rect) {

  let draw = new DrawContext()
  draw.size = new Size(rect.width, rect.height)

  draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y)) 

	fm.writeImage(path, draw.getImage())
	
	return fm.readImage(path)
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
  let phones = {
    "2688": {
      "small": 507,
      "medium": 1080,
      "large": 1137,
      "left": 81,
      "right": 654,
      "top": 228,
      "middle": 858,
      "bottom": 1488
    },

    "1792": {
      "small": 338,
      "medium": 720,
      "large": 758,
      "left": 54,
      "right": 436,
      "top": 160,
      "middle": 580,
      "bottom": 1000
    },

    "2436": {
      "small": 465,
      "medium": 987,
      "large": 1035,
      "left": 69,
      "right": 591,
      "top": 213,
      "middle": 783,
      "bottom": 1353
    },

    "2208": {
      "small": 471,
      "medium": 1044,
      "large": 1071,
      "left": 99,
      "right": 672,
      "top": 114,
      "middle": 696,
      "bottom": 1278
    },

    "1334": {
      "small": 296,
      "medium": 642,
      "large": 648,
      "left": 54,
      "right": 400,
      "top": 60,
      "middle": 412,
      "bottom": 764
    },

    "1136": {
      "small": 282,
      "medium": 584,
      "large": 622,
      "left": 30,
      "right": 332,
      "top": 59,
      "middle": 399,
      "bottom": 399
    },
    
    "1624": {
      "small": 310,
      "medium": 658,
      "large": 690,
      "left": 46,
      "right": 394,
      "top": 142,
      "middle": 522,
      "bottom": 902 
    }
  }
  return phones
}
