import cheerio from "cheerio";

export default class Parser {

    parseTournamentsPageHtml(html) {
        const $ = cheerio.load(html);

        const rows = $(".place-tournaments > table > tbody > tr:not(:first-child)");

        return rows.map((i, row) => {
            const $td = $(row).children("td");

            const href = $td.eq(3).find("a").attr("href");

            const winners = $td.eq(7).children("a").map((i, a) => {
                const href = $(a).attr("href");

                return {
                    url: href,
                    image: $(a).children("img").attr("src"),
                    id: href.substr(6),
                    name: $(a).text().replace(/\s+\(.*?\)$/, ""),
                    username: $(a).find(".username").text(),
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
}
