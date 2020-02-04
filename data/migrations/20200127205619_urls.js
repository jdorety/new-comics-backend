exports.up = function(knex) {
  return knex.schema.createTable("urls", url => {
    url.increments();
    url.string("url", 255).notNullable();
    url.string("diamond_id", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("urls");
};
