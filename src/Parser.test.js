import fs from "fs";
import Parser from "./Parser";

describe("Parser", () => {

    test("getTournaments [tournaments-page.html -> getTournaments.json]", () => {
        const html = fs.readFileSync("./tests-data/tournaments-page.html", "utf8");
        const expectedResult = JSON.parse(fs.readFileSync("./tests-data/getTournaments.json", "utf8"));

        const parser = new Parser();
        const result = parser.getTournaments(html);

        expect(result).toEqual(expectedResult);
    });

});
