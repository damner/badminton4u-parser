import fs from "fs";
import Parser from "./Parser";

describe("Parser", () => {

    const tests = [
        {
            method: "getTournaments",
            htmlFile: "tournaments-page.html",
            resultFile: "getTournaments.json",
        },
        {
            method: "getTeams",
            htmlFile: "tournament-doubles.html",
            resultFile: "getTeams-doubles.json",
        },
        {
            method: "getTeams",
            htmlFile: "tournament-singles.html",
            resultFile: "getTeams-singles.json",
        },
        {
            method: "getMatches",
            htmlFile: "tournament-doubles.html",
            resultFile: "getMatches-doubles.json",
        },
        {
            method: "getMatches",
            htmlFile: "tournament-singles.html",
            resultFile: "getMatches-singles.json",
        },
        {
            method: "getPlayers",
            htmlFile: "rating.html",
            resultFile: "getPlayers.json",
        },
        {
            method: "getPlayerInfo",
            htmlFile: "player.html",
            resultFile: "getPlayerInfo.json",
        },
    ];

    tests.forEach(data => {
        const { method, htmlFile, resultFile } = data;

        test(`${method} [${htmlFile} -> ${resultFile}]`, () => {
            const html = fs.readFileSync(`./tests-data/${htmlFile}`, "utf8");
            const expectedResult = JSON.parse(fs.readFileSync(`./tests-data/${resultFile}`, "utf8"));

            const parser = new Parser();
            const result = parser[method](html);

            expect(result).toEqual(expectedResult);
        });
    });

});
