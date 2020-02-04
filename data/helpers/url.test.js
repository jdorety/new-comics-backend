const url = require("./url");
const db = require("../dbConfig");

describe("the urls table", () => {
  describe("add to list helper", () => {
    beforeEach(async () => {
      await db("urls").truncate();
    });

    it("should insert the following url's into the table as an array", async () => {
      const urls = [
        { diamond_id: "testing1", url: "http://testing.com" },
        { diamond_id: "testing2", url: "http://testing.com" },
        { diamond_id: "testing3", url: "http://testing.com" },
        { diamond_id: "testing4", url: "http://testing.com" },
        { diamond_id: "testing5", url: "http://testing.com" },
        { diamond_id: "testing6", url: "http://testing.com" },
        { diamond_id: "testing7", url: "http://testing.com" },
        { diamond_id: "testing8", url: "http://testing.com" },
        { diamond_id: "testing9", url: "http://testing.com" }
      ];
      await url.addToList(urls);
      const response = await url.getList();
      expect(response).toHaveLength(9);
    });

    it("should be able to insert one url by itself", async () => {
      await url.addToList({
        diamond_id: "testingByMyself",
        url: "http://www.com"
      });
      const onlyOne = await url.getList();
      expect(onlyOne).toHaveLength(1);
    });

    it("should reject an insert without diamond_id", async () => {
      const e = await url.addToList({ url: "http://spamalot.com" });

      await expect(e).toEqual(
        "insert into `urls` (`url`) values ('http://spamalot.com') - SQLITE_CONSTRAINT: NOT NULL constraint failed: urls.diamond_idError: SQLITE_CONSTRAINT: NOT NULL constraint failed: urls.diamond_id"
      );
      // await expect(e.reject(new Error("spamalot"))).rejects.toThrow("spamalot");
      // try {
      //   let e = await url.addToList({ url: "http://spamalot.com" });
      // } catch (err) {
      //   e = err;
      //   await expect(err.reject(new Error("spamalot"))).rejects.toThrow("spamalot");
      // }
    });
  });
});
