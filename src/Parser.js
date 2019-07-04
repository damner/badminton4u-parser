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

        console.log(JSON.stringify($rows.map((i, row) => {
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
                ratingChanges: parseFloat(ratingChanges) || null,
            };
        }).get()));

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
                ratingChanges: parseFloat(ratingChanges) || null,
            };
        }).get();
    }

}
