// CONTROL PANEL ====== AUTHENTICATION SECTION
exports.adminLoginView = (req, res) => {
    const { by } = req.query;
    if(!by || typeof by == "undefined") {
        return res
        .render('control/auth/login');
    }
    return res
    .render('control/auth/login_email');
}

exports.adminLoginHandler = async (req, res) => {
    const { by } = req.query;
    const { username, email, password } = req.body;
    if(by == "email") {
        if(email == "ziyad" && password == "ziyad") {
            return res
            .json({ message: "success" });
        }
        return res
        .json({ message: "failed" });
    }
}