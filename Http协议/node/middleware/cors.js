
function cors(setting) {
  console.log(setting);
  return (req, res, next) => {
    console.log("????")
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  }
}

module.exports = cors;