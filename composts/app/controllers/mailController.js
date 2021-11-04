const nodemailer = require("nodemailer");


const mailController = {
    // async..await is not allowed in global scope, must use a wrapper
    sendMail: async (req, res) => {
        try { // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "compostons.noreply@gmail.com",
                    pass: "Compostons"
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Compostons" <compostons-noreply@gmail.com>', // sender address
                to: "loicfort@free.fr", // list of receivers
                subject: "Un utilisateur Compostons souhaite rentrer en relation avec vous", // Subject line
                replyTo:'',
                text: "On échange? ", // plain text body
                html: `<b>${req.body.mail}</b>`, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.status(200).send('mail envoyé')
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        } catch (err) {
            console.log(err);
        }
    }


};




module.exports = mailController;