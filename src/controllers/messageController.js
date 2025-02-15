const User = require('../models/user');
const Message = require('../models/message')

const sendMessage = async (req, res) => {
    try {
        const { email, subject, message, name } = req.body
        const verifyEmail = await User.findOne({ email })
        console.log('Eve: ', verifyEmail)
        if (!verifyEmail) {
            res.status(404).json({
                success: false,
                message: 'User not found please register first.',
            })
        }
        const msg = new Message({
            client: verifyEmail._id,
            subject, message, name
        })
        const msgSave = await msg.save()
        console.log({"msgSave":msgSave, "Msg":msg})

        if (msgSave) {
            await User.findByIdAndUpdate(verifyEmail._id, { message: msg._id }, { new: true })
            res.status(201).json({success:true, message: 'Message sent successfully.'}) 
        }
        return;
    } catch (error) {
        res.status(501).json({
            success: false,
            message: 'Server Error: ' + error.message,
        })
    }
}

module.exports = { sendMessage }