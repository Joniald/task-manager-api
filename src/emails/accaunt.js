
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: "jonialdshena@gmail.com",
//     from: "jonialdshena@gmail.com",
//     subject: "My first email",
//     text: "Lets send my first email...great",
//     html: '<div style="font-family: inherit">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt elementum sem non luctus.</div>'
// })
 
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "jonialdshena@gmail.com",
        subject: "Welcome",
        //text: "Welcome to this handsome application",
        html: '<h3>'+name+', we are now all together in this effort. Welcome to this handsome application. </h3>'
    })
}

const sendConfirmDeletion = (email,name) => {
    sgMail.send({
        to: email,
        from: "jonialdshena@gmail.com",
        subject: "Confirm Account Deletion",
        //text: 'Goodbye from this application',
        html: '<h3>'+name+', Your account has been deleted successfully. Goodbye from this application and hope to see you soon. </h3>'
    })
}


module.exports = {
    sendWelcomeEmail,
    sendConfirmDeletion
}