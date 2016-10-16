var Player = (function () {
    function Player(game) {
        this.game = game;
        this.createSprite();
    }
    Player.prototype.createSprite = function () {
        var textureUrl = this.game.SCENE_PATH + "Character.png";
        var cellSize = 350;
        this.spriteMgr = new BABYLON.SpriteManager("PlayerSpriteManager", textureUrl, 1, cellSize, this.game.scene);
        this.sprite = new BABYLON.Sprite("Player", this.spriteMgr);
        this.sprite.position = new BABYLON.Vector3(17.42, 1.71, 7);
        this.sprite.size = 8;
    };
    Player.prototype.update = function (dt) {
        this.handleInput(dt);
    };
    Player.prototype.handleInput = function (dt) {
        var move = 0;
        if (this.game.input.isMoveLeft()) {
            move += -1;
        }
        if (this.game.input.isMoveRight()) {
            move += 1;
        }
        var moveSpeed = 10;
        var moveDelta = moveSpeed * move * dt;
        this.sprite.position.x += moveDelta;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map