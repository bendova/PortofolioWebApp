var Player = (function () {
    function Player(game) {
        this.game = game;
        this.createSprite();
    }
    Player.prototype.createSprite = function () {
        var textureUrl = this.game.SCENE_PATH + "Character.png";
        var cellSize = 350;
        var playerSpriteMgr = new BABYLON.SpriteManager("PlayerSpriteManager", textureUrl, 1, cellSize, this.game.scene);
        var playerSprite = new BABYLON.Sprite("Player", playerSpriteMgr);
        playerSprite.position = new BABYLON.Vector3(17.42, 1.71, 7);
        playerSprite.size = 8;
    };
    Player.prototype.update = function (dt) {
        //let inputMgr: BABYLON.CameraInputsManager<BABYLON.Camera> = this.game.camera.inputs;
        //TODO
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map