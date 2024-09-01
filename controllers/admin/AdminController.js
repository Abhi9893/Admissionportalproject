class AdminController {
    static deshboard = async (req, res) => {
        try {
            res.render('admin/deshboard')
        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            res.render('admin/display')
        } catch (error) {
            console.log(error)
        }
    }

    static adduser = async (req, res) => {
        try {
            res.render('admin/adduser')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AdminController