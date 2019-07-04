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

    test("getTeams [tournament-doubles.html -> getTeams-doubles.json]", () => {
        const html = fs.readFileSync("./tests-data/tournament-doubles.html", "utf8");
        const expectedResult = JSON.parse(fs.readFileSync("./tests-data/getTeams-doubles.json", "utf8"));

        const parser = new Parser();
        const result = parser.getTeams(html);

        expect(result).toEqual(expectedResult);
    });

    test("getTeams [tournament-singles.html -> getTeams-singles.json]", () => {
        const html = fs.readFileSync("./tests-data/tournament-singles.html", "utf8");
        const expectedResult = JSON.parse(fs.readFileSync("./tests-data/getTeams-singles.json", "utf8"));

        const parser = new Parser();
        const result = parser.getTeams(html);

        expect(result).toEqual(expectedResult);
    });

    test("getMatches [tournament-doubles.html -> getMatches-doubles.json]", () => {
        const html = fs.readFileSync("./tests-data/tournament-doubles.html", "utf8");
        const expectedResult = JSON.parse(fs.readFileSync("./tests-data/getMatches-doubles.json", "utf8"));

        const parser = new Parser();
        const result = parser.getMatches(html);

        expect(result).toEqual(expectedResult);
    });

    test("getMatches [tournament-singles.html -> getMatches-singles.json]", () => {
        const html = fs.readFileSync("./tests-data/tournament-singles.html", "utf8");
        const expectedResult = JSON.parse(fs.readFileSync("./tests-data/getMatches-singles.json", "utf8"));

        const parser = new Parser();
        const result = parser.getMatches(html);

        expect(result).toEqual(expectedResult);
    });

});
