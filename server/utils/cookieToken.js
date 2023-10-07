const cookieToken = (user, res) => {
    const token = user.getJwtToken();
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        sucess: true,
        message: "Logged in",
        token,
        user
    })
}

module.exports = cookieToken;