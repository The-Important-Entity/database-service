'use strict';
require("dotenv").config();
const integration_tests = require("./integration");
const Asserter = require("./assert");
const Requester = require("./requester");
const { execSync } = require("child_process");
const path = require("path");

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const run_tests = async function(){
    try {
        execSync("sudo rm -r /home/jscalera/data/pg");
    }
    catch {

    }
    
    execSync(path.join(__dirname + "../../../deployment-scripts/database/run.sh") + " " + process.env.DB_PASS + " " + process.env.DB_PORT + " /home/jscalera/data/pg", {
        cwd: path.join(__dirname + "../../../deployment-scripts/database")
    });

    for (var i = 0; i < 1000; i++) {
        try {
            const stdout = execSync("sudo docker exec pg pg_isready -d account_data | grep 'accepting connections' --text");
            if (stdout.length > 0){
                break;
            }
        }
        catch {

        }
        await sleep(500);
    }
    await sleep(3000);

    const DatabaseService = require("..");
    const config = require("../src/config");

    const server = new DatabaseService(config);
    await server.start();

    const tester = new Asserter();
    const requester = new Requester();
    await integration_tests(tester, requester);
    tester.printResults();
    await server.stop();


    const stdout = execSync(path.join(__dirname + "../../../deployment-scripts/database/stop.sh"), {
        cwd: path.join(__dirname + "../../../deployment-scripts/database")
    });
}
run_tests();