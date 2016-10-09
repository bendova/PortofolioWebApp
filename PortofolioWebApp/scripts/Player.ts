class Player
{
    private game: Game;

    constructor(game:Game)
    {
        this.game = game;
        this.createSprite();
    }

    private createSprite(): void
    {
        let textureUrl: string = this.game.SCENE_PATH + "Character.png";
        let cellSize: number = 350;
        let playerSpriteMgr: BABYLON.SpriteManager = new BABYLON.SpriteManager("PlayerSpriteManager", textureUrl, 1, cellSize, this.game.scene);
        let playerSprite = new BABYLON.Sprite("Player", playerSpriteMgr);
        playerSprite.position = new BABYLON.Vector3(17.42, 1.71, 7);
        playerSprite.size = 8;
    }

    public update(dt: number): void
    {
        //let inputMgr: BABYLON.CameraInputsManager<BABYLON.Camera> = this.game.camera.inputs;
        //TODO
    }
}