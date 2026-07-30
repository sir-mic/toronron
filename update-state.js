const fs = require("fs");
const simpleGit = require("simple-git");

const git = simpleGit();

const activity = process.argv[2];

if (!activity) {
    console.log("No activity supplied.");
    process.exit(1);
}

const state = {
    available: true,
    activity: activity
};

fs.writeFileSync(
    "state.json",
    JSON.stringify(state, null, 4)
);

(async () => {
    try {

        await git.add("state.json");

        await git.commit(`New activity: ${activity}`);

        await git.push();

        console.log("Published!");

    } catch(err) {

        console.log(err);

    }
})();