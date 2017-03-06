let https = require('https')
let cheerio = require('cheerio')
let fs = require('fs')

const url = "https://www.zhihu.com/topic/19552521/hot"

//getData
function download(url,callback) {
	https.get(url,res => {
		let data = ""

		res.on('data', chunk => {
			data += chunk
		})

		res.on('end', () => {
			callback(data)
		})

	}).on('error', () => {
		callback(null)
	})
}


function callback(data) {
	let $ = cheerio.load(data)
	let arr = []

	//get title.text
	if($('title') && $('title').text() !== 'undefined') {
		arr.push($('title').text().trim())
	}

	//get a.href
	if($('a')){

		for(var i = 0, len =  $('a').length; i < len; i++){
			
			let href = $('a')[i].attribs.href
			
			if(typeof(href) !== 'undefined'){
				arr.push(href)
			}
		}
		
		console.log(arr.length)
	}

	stringToLocal(arr)

}

function stringToLocal(arr) {
	let str = JSON.stringify(arr)

	//save to result.json
	fs.writeFileSync("demo1/result.json",str)
}

download(url,callback);