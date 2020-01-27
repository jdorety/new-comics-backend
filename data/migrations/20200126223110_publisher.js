exports.up = function(knex) {
  return knex.schema.createTable("publisher", tbl => {
    tbl.increments();
    tbl
      .string("pub_name")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("publisher");
};
