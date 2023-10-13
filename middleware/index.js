function postMiddleware(req, res, next) {
   const { name, location } = req.body;

   if (!name || !location) {
      return res.status(400).json({ error: "Name and location required" });
   }

   next();
}

function putMiddleware(req, res, next) {
   if (!req.params["id"]) {
      return res.status(400).json({ error: "Name required" });
   }

   next();
}

function deleteMiddleware(req, res, next) {
   if (!req.params.id) {
      return res.status(400).json({ error: "Name required" });
   }

   next();
}

module.exports = { postMiddleware, putMiddleware, deleteMiddleware };
