import fs from "fs";
import Parser from "./Parser";

describe("Parser", () => {

    test("parseTournamentsPageHtml parse tournaments-page.html to tournaments-page.json", () => {
        const tournamentsPageHtml = fs.readFileSync("./tests-html/tournaments-page.html", "utf8");
        const tournamentsPageHtmlResult = JSON.parse(fs.readFileSync("./tests-html/tournaments-page.json", "utf8"));

        const parser = new Parser();
        const result = parser.parseTournamentsPageHtml(tournamentsPageHtml);

        expect(result).toEqual(tournamentsPageHtmlResult);
    });

});
