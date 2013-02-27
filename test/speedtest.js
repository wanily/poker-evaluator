var PokerEvaluator = require("../index");
var path = require('path');
var evaluator = new PokerEvaluator(path.join(__dirname, "../HandRanks.dat"));

function enumerateAllHands() {
  var u0, u1, u2, u3, u4, u5;
  var c0, c1, c2, c3, c4, c5, c6;
  var handTypeSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var count = 0;

  console.log("Enumerating and evaluating all 133,784,560 possible 7-card poker hands...\n");

  var startTime = Date.now();

  for (c0 = 1; c0 < 47; c0++) {
    u0 = evaluator.evalCard(53+c0);
    for (c1 = c0+1; c1 < 48; c1++) {
      u1 = evaluator.evalCard(u0+c1);
      for (c2 = c1+1; c2 < 49; c2++) {
        u2 = evaluator.evalCard(u1+c2);
        for (c3 = c2+1; c3 < 50; c3++) {
          u3 = evaluator.evalCard(u2+c3);
          for (c4 = c3+1; c4 < 51; c4++) {
            u4 = evaluator.evalCard(u3+c4);
            for (c5 = c4+1; c5 < 52; c5++) {
              u5 = evaluator.evalCard(u4+c5);
              for (c6 = c5+1; c6 < 53; c6++) {

                handTypeSum[evaluator.evalCard(u5+c6) >> 12]++;
                count++;
              }
            }
          }
        }
      }
    }
  }

  var endTime = Date.now();

  console.log("BAD:              %d\n", handTypeSum[0]);
  console.log("High Card:        %d\n", handTypeSum[1]);
  console.log("One Pair:         %d\n", handTypeSum[2]);
  console.log("Two Pair:         %d\n", handTypeSum[3]);
  console.log("Trips:            %d\n", handTypeSum[4]);
  console.log("Straight:         %d\n", handTypeSum[5]);
  console.log("Flush:            %d\n", handTypeSum[6]);
  console.log("Full House:       %d\n", handTypeSum[7]);
  console.log("Quads:            %d\n", handTypeSum[8]);
  console.log("Straight Flush:   %d\n", handTypeSum[9]);

  // Perform sanity checks.. make sure numbers are where they should be
  var testCount = 0;
  for (var index = 0; index < 10; index++)
    testCount += handTypeSum[index];
  if (testCount != count || count != 133784560 || handTypeSum[0] != 0)
  {
    console.log("\nERROR!");
    return;
  }

  console.log("\nEnumerated " + count + " hands in " + (endTime - startTime) + " milliseconds!\n");
}

enumerateAllHands();
