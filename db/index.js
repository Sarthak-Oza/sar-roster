const { uid } = require("uid");
const axios = require("axios");

class Roster {
   constructor() {}

   async addStudent({ name, location }) {
      const id = uid();

      this[id] = {
         id,
         name,
         location,
         profilePic: await this.getPhoto(location),
      };
      return this[id];
   }

   getOneStudent(id) {
      if (this[id]) {
         return this[id];
      }

      return false;
   }

   getAllStudents() {
      return this;
   }

   async updateStudent({ id, name, location }) {
      if (this[id]) {
         this[id] = {
            id,
            name,
            location,
            profilePic: await this.getPhoto(location),
         };

         return this[id];
      }

      return false;
   }

   deleteStudent(id) {
      if (this[id]) {
         return delete this[id];
      }

      return false;
   }

   async getPhoto(location) {
      let photoUrl = null;

      try {
         const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${location}`,
            {
               headers: {
                  Authorization: process.env.PEXEL_API_KEY,
               },
            }
         );

         photoUrl =
            response.data.photos[
               Math.floor(Math.random() * response.data.photos.length)
            ].src.small;
      } catch (error) {
         console.log(error);
      }

      return photoUrl;
   }
}

module.exports = {
   rosterDB: new Roster(),
};
