exports.up = function(knex) {
  return knex.schema.createTable("book", tbl => {
    tbl.increments();
    tbl.string("title").notNullable();
    tbl
      .integer("publisher_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("publisher")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.text("description").notNullable();
    tbl.string("creators").notNullable();
    tbl.string("price").notNullable();
    tbl.date("release_date").notNullable();
    tbl.string("diamond_id").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("book");
};
