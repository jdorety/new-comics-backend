exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("publisher")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("publisher").insert([
        { pub_name: "MARVEL COMICS" },
        { pub_name: "DC COMICS" },
        { pub_name: "IMAGE COMICS" },
        { pub_name: "DYNAMITE" },
        { pub_name: "DARK HORSE COMICS" },
        { pub_name: "BOOM! STUDIOS" },
        { pub_name: "IDW PUBLISHING" }
      ]);
    });
};
