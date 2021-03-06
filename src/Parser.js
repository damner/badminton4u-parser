import cheerio from "cheerio";

export default class Parser {

    getTournaments(html) {
        const $ = cheerio.load(html);

        const $rows = $(".place-tournaments > table > tbody > tr:not(:first-child)");

        return $rows.map((i, row) => {
            const $td = $(row).children("td");

            const href = $td.eq(3).find("a").attr("href");

            const winners = $td.eq(7).children("a").map((i, a) => {
                const href = $(a).attr("href");

                const username = $(a).find(".username").text();

                return {
                    url: href,
                    image: $(a).children("img").attr("src"),
                    id: +href.substr(8),
                    name: $(a).text().replace(/\s+\(.*?\)$/, ""),
                    username: username || null,
                };
            }).get();

            return {
                url: href,
                id: +href.substr(6),
                title: $td.eq(3).find("a").text().trim(),
                type: $td.eq(2).text().trim(),
                players: +$td.eq(4).text(),
                comments: +$td.eq(6).text(),
                date: $td.eq(0).text().trim(),
                time: $td.eq(1).text().trim(),
                winners: winners,
            };
        }).get();
    }

    getTeams(html) {
        const $ = cheerio.load(html);

        const $rows = $(".members > .item:nth-child(2) > table > tbody > tr:not(:first-child)");

        return $rows.map((i, row) => {
            const $td = $(row).children("td");

            const place = $td.eq(0).text();

            const rating = $td.eq(3).text().trim();
            let teamRating = rating;
            let playersRating = [rating];
            const ratingResult = rating.match(/^(\d+)\s*\((\d+)\s*\/\s*(\d+)\)$/);
            if (ratingResult) {
                teamRating = ratingResult[1];
                playersRating = [ratingResult[2], ratingResult[3]];
            }

            const players = $td.eq(1).find("a").map((i, a) => {
                const href = $(a).attr("href");

                let name = $(a).text().trim();
                let username = null;
                const result = name.match(/^(.*?)\s+\((.*?)\)$/);
                if (result) {
                    name = result[1];
                    username = result[2];
                }

                return {
                    url: href,
                    id: +href.substr(8),
                    name: name,
                    username: username,
                    rating: parseInt(playersRating[i]) || null,
                };
            }).get();

            const matches = $td.eq(2).text().trim();
            const parsedMatches = matches.match(/^(\d+)\s*\((\d+)\-(\d+)\)$/);

            const ratingChanges = $td.eq(4).text().trim();

            return {
                place: parseInt(place) || null,
                players: players,
                matches: {
                    total: +parsedMatches[1],
                    won: +parsedMatches[2],
                    lost: +parsedMatches[3],
                },
                rating: parseInt(teamRating) || null,
                ratingChanges: isNaN(ratingChanges) ? null : parseFloat(ratingChanges),
            };
        }).get();
    }

    getMatches(html) {
        const $ = cheerio.load(html);

        const $rows = $(".members > .item:nth-child(5) > table > tbody > tr");

        return $rows.map((i, row) => {
            const $td = $(row).children("td");

            const players1 = $td.eq(1).find("a").map((i, a) => {
                const href = $(a).attr("href");

                return {
                    url: href,
                    id: +href.substr(8),
                    name: $(a).text().trim(),
                };
            }).get();

            const players2 = $td.eq(3).find("a").map((i, a) => {
                const href = $(a).attr("href");

                return {
                    url: href,
                    id: +href.substr(8),
                    name: $(a).text().trim(),
                };
            }).get();

            const scores = $td.eq(2).text().trim();
            const parsedScores = scores.match(/^(\d+)\s*:\s*(\d+)$/);

            const team1 = {
                ratingChanges: $td.eq(0).text().trim(),
            };

            const team2 = {
                ratingChanges: $td.eq(4).text().trim(),
            };

            return {
                team1: {
                    score: isNaN(parsedScores[1]) ? null : parseInt(parsedScores[1]),
                    ratingChanges: isNaN(team1.ratingChanges) ? null : parseFloat(team1.ratingChanges),
                    players: players1,
                },
                team2: {
                    score: isNaN(parsedScores[2]) ? null : parseInt(parsedScores[2]),
                    ratingChanges: isNaN(team2.ratingChanges) ? null : parseFloat(team2.ratingChanges),
                    players: players2,
                },
            };
        }).get();
    }

    getPlayers(html) {
        const $ = cheerio.load(html);

        const $rows = $(".players > table > tbody > tr:not(:first-child)");

        return $rows.map((i, row) => {
            const $td = $(row).children("td");

            const href = $td.eq(1).find("a").attr("href");
            const name = $td.eq(1).find("a").text();
            const username = $td.eq(2).text();
            const city = $td.eq(3).text();
            const ratingSingles = $td.eq(4).text();
            const ratingSinglesDate = $td.eq(5).text();
            const ratingDoubles = $td.eq(6).text();
            const ratingDoublesDate = $td.eq(7).text();

            return {
                id: +href.substr(8),
                url: href,
                n: parseInt($td.eq(0).text()) || null,
                name: name,
                username: username || null,
                city: city || null,
                rating: {
                    singles: isNaN(ratingSingles) ? null : parseInt(ratingSingles),
                    singlesDate: ratingSinglesDate.length <= 1 ? null : ratingSinglesDate,
                    doubles: isNaN(ratingDoubles) ? null : parseInt(ratingDoubles),
                    doublesDate: ratingDoublesDate.length <= 1 ? null : ratingDoublesDate,
                }
            };
        }).get();
    }

    getPlayerInfo(html) {
        const $ = cheerio.load(html);

        const $container = $(".profile-page");

        const title = $container.find("> .title > h1").text();
        const username = $container.find(".profile .desc > .user-name").text();

        const $profileInfo = $container.find(".profile-info");
        const $tables = $profileInfo.find(".user-rating-table");

        const $ratingsRows = $tables.eq(0).find("> tbody > tr:not(:first-child)");

        const ratings = $ratingsRows.map((i, row) => {
            const $td = $(row).children("td");

            return {
                position: +$td.eq(0).text(),
                title: $td.eq(1).text(),
                rating: +$td.eq(2).text(),
                date: $td.eq(3).text(),
            };
        }).get();

        const $userInfoTable = $profileInfo.find(".user-info-table");

        const info = $userInfoTable.find("> tbody > tr").map((i, row) => {
            const $td = $(row).children("td");

            return {
                title: $td.eq(0).text(),
                value: $td.eq(1).text(),
            };
        }).get();

        return {
            id: +title.split("ID:")[1].trim(),
            name: title.split("ID:")[0].trim(),
            username: username || null,
            ratings: ratings,
            info: info,
        };
    }

}
