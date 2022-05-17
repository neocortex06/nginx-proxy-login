const express = require("express");
const morgan = require("morgan");
const session = require('express-session')

const app = express();
app.set('trust proxy', 1) // trust first proxy
const sess = {
    secret: 'keyboard cat',
    cookie: {},
    resave: true,
    saveUninitialized: true,
}
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

const PORT = 3030;
const HOST = "localhost";

app.use(morgan("dev"));
app.get("/", (req, res, next) => {
    res.send("login servisim");
});
app.get("/json_placeholder", (req, res, next) => {
    res.send("Json listem");
});
app.get("/json_placeholder/posts", (req, res, next) => {
    res.send("post listem");
});

app.get("/login", (req, res, next) => {
    req.session.loggedIn = true;
    res.send("login successful");
});
app.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        return res.send("cikis yapildi");
    });
});
app.get("/check", (req, res, next) => {
    if (req.session.loggedIn) {
        return res.send("Oturum acik");
    }else{
        return res.send("Oturum kapali");
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Proxy starting at ${HOST}:${PORT}`);
});
