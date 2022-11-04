var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        
      user: 'zribi.sirine@esprit.tn',
      pass: 'E09948252'
    }
  });

  var mailOptions = {
    from: 'zribi.sirine@esprit.tn',
    to: 'zribi.sirine@esprit.tn',
    subject: 'Sending Email using Node.js',
    text: 'welcome to versTun application!'
  };
  
  

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });