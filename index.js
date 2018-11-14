const cheerio = require('cheerio');
const Crawler = require('crawler');
const fs = require('fs');
const nodemailer = require('nodemailer');
const INTERVAL = 30 * 60 * 1000;
const SENDER_ACCOUNT = 'sender.email@gmail.com';
const SENDER_PASSWORD = 'sender-password';
const RECEIVER_ACCOUNT = 'receiver.email@gmail.com';

let crawler = new Crawler({
    maxConnections : 1,
    callback : (error, res, done) => {
      if(error){
        console.log('Error  on Crawler:' + error);
      }else{
      	process_res(res);
      }
      done();
    }
});

function process_res(res){
  let $ = res.$;
  let data = [];
  $("#list #li #blocket div div div div div.item_row").each( (i, elem) => {
    let doc = $( elem );
    let href = doc.find('div.desc a').attr('href')
    if( href ){
    	data.push( href )
    }
  });

  if(data.length === 0) return;
  resultDir = __dirname + '/data/list.json'
  if(fs.existsSync(resultDir)){
		fs.readFile(resultDir, 'utf8', (err, dt) => {
		  if(err) throw err;
		  let latest = data[0]
		  let oldData = JSON.parse(dt)['data'];
		  let newLinks = [];
	    if(!oldData[0] || (oldData[0] && latest !== oldData[0])){
	    	// compare with old result and find the new links
	    	data.forEach((element) => {
	    		if (!oldData.includes(element)){
	    			newLinks.push( element );
	    		}
	    	})
        saveFile(data);
	    }
	    if(newLinks.length > 0) sendEmail(newLinks.join("\r\n"));
		});
  }else{
    saveFile(data);
    sendEmail(data.join("\r\n"));
  }

}

function saveFile( data ){
  fs.writeFile(__dirname + '/data/list.json', JSON.stringify({
      status: 0,
      data: data
  }), (err) => {
  	if(err){
  	  console.log('Error from saveFile(): ', err);
  	}else{
  		console.log('List is saved.');
  	}
  });
}

function sendEmail( links ){
	let transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: SENDER_ACCOUNT,
	    pass: SENDER_PASSWORD
	  }
	});
	let mailOptions = {
	  from: SENDER_ACCOUNT,
	  to: RECEIVER_ACCOUNT,
	  subject: 'New item from Tori',
	  text: links
	};
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
	    console.log('Error from sendEmail() ' + error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}

function crawle_tori( queryStr ){
	setInterval( () => {
	  let currentTime = new Date().toLocaleString()
	  let uri = `https://www.tori.fi/uusimaa?q=`+ queryStr +`&cg=0&w=1&st=s&st=g&ca=18&l=0&md=th`;
    console.log('Crawling website at:', currentTime );
    console.log('Crawling website is:', uri );
	  crawler.queue({
		  uri: uri
	  });
	}, INTERVAL);
}

function process_args( args ){
	if(args.length < 3){
		console.log('Please specify the search words');
		process.exit();
	}
	let queryStr = args[2];
	if(args.length >= 4){
		args.forEach((val, index, array) =>{
			if(index > 2){
				queryStr = queryStr + '+' + val;
			}
		})
	}
  crawle_tori( queryStr )
}

process_args( process.argv );
