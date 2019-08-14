new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    yourHealth: 100,
    monsterHealth: 100,
    rounds: [
      {
        message: "",
        playerClass: ""
      }
    ]
  },
  computed: {
    yourHealthProgress: function() {
      return {
        width: this.yourHealth + "%"
      };
    },
    monsterHealthProgress: function() {
      return {
        width: this.monsterHealth + "%"
      };
    }
  },
  methods: {
    generateRandomNumber: function(multiplier) {
      return Math.round(Math.random() * multiplier);
    },
    monsterTurn: function() {
      var randomDamageByMonster = this.generateRandomNumber(10);
      this.yourHealth -= randomDamageByMonster;
      var message = this.generateRoundMessage(
        "monster",
        "hits player",
        randomDamageByMonster,
        "monster-turn"
      );
      this.checkGameCondition();
    },
    playerTurn: function(event) {
      switch (event.currentTarget.id) {
        case "attack":
          var randomDamageByYou = this.generateRandomNumber(12);
          this.monsterHealth -= randomDamageByYou;
          this.generateRoundMessage(
            "player",
            "hits monster",
            randomDamageByYou,
            "player-turn"
          );
          this.monsterTurn();
          break;
        case "special-attack":
          var randomDamageByYou = this.generateRandomNumber(20);
          this.monsterHealth -= randomDamageByYou;
          this.generateRoundMessage(
            "player",
            "hits monster",
            randomDamageByYou,
            "player-turn"
          );
          this.monsterTurn();
          break;
        case "heal":
          var randomHealByYou = this.generateRandomNumber(20);
          this.yourHealth += randomHealByYou;
          this.generateRoundMessage(
            "player",
            "heals themself",
            randomHealByYou,
            "player-turn"
          );
          this.monsterTurn();
          break;
      }
    },
    generateRoundMessage: function(user, action, points, userClass) {
      this.rounds.push({
        message: user + " " + action + " for " + points,
        playerClass: userClass
      });
    },
    checkGameCondition: function() {
      if (this.yourHealth <= 0) {
        this.playerLost();
      }
      if (this.monsterHealth <= 0) {
        this.playerWins();
      }
    },
    playerWins: function() {
      alert("You won, try again?");
      this.endGame();
    },
    playerLost: function() {
      alert("Sorry, you lost to the monster. Try again.");
      this.endGame();
    },
    endGame: function() {
      this.gameStarted = false;
      this.yourHealth = 100;
      this.monsterHealth = 100;
      this.rounds = [
        {
          message: "",
          playerClass: ""
        }
      ];
    }
  }
});
