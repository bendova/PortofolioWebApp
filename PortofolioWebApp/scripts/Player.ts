class Player
{
    private game: Game;

    private spriteMgr: BABYLON.SpriteManager;
    private sprite: BABYLON.Sprite;

    constructor(game:Game)
    {
        this.game = game;
        this.createSprite();
    }

    private createSprite(): void
    {
        let textureUrl: string = this.game.SCENE_PATH + "Character.png";
        let cellSize: number = 350;
        this.spriteMgr = new BABYLON.SpriteManager("PlayerSpriteManager", textureUrl, 1, cellSize, this.game.scene);
        this.sprite = new BABYLON.Sprite("Player", this.spriteMgr);
        this.sprite.position = new BABYLON.Vector3(17.42, 1.71, 7);
        this.sprite.size = 8;
    }
    
    public update(dt: number): void
    {
        this.handleInput(dt);
    }

    private handleInput(dt:number): void
    {
        let move: number = 0;
        if (this.game.input.isMoveLeft())
        {
            move += -1;
        }
        if (this.game.input.isMoveRight())
        {
            move += 1;
        }

        let moveSpeed: number = 10;
        let moveDelta: number = moveSpeed * move * dt;
        this.sprite.position.x += moveDelta;
    }
}