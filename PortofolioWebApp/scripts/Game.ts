
window.onload = () => 
{
    let main = new Game();
};

class Game
{
    public SCENE_PATH:string  = "scene/"

    public document: Document;
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;
    public scene: BABYLON.Scene;
    public camera: BABYLON.Camera;
    
    private referenceWidth: number = 1920;
    private referenceHeight: number = 1080;
    private referenceOrthoSizeX: number = 16;
    private referenceOrthoSizeY: number = 9;
    
    private renderWidth: number = 0;
    private renderHeight: number = 0;
    private orthoSizeX: number = 0;
    private orthoSizeY: number = 0;
    private orthoScaleFactor: number = 1.2;

    private player: Player;

    constructor()
    {
        this.document = document;
        if (BABYLON.Engine.isSupported())
        {
            this.canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
            this.engine = new BABYLON.Engine(this.canvas, true);
            
            BABYLON.SceneLoader.Load(this.SCENE_PATH, "ExportDemo.babylon", this.engine, (scene) =>
            {
                this.scene = scene;
                scene.executeWhenReady(() =>
                {
                    this.configureCamera();
                    this.createGameEntities();

                    this.engine.runRenderLoop(() =>
                    {
                        this.onRender();
                    });
                });
                scene.registerBeforeRender(() =>
                {
                    this.onUpdate(this.engine.getDeltaTime());
                });
            });

            window.addEventListener("resize", () =>
            {
                this.engine.resize();
            });
        }
    }

    private configureCamera():void
    {
        this.camera = (this.scene.activeCamera as BABYLON.FreeCamera);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this.refreshCameraParams();
    }

    private refreshCameraParams(): void
    {
        if (this.renderWidth != this.canvas.clientWidth)
        {
            this.renderWidth = this.canvas.clientWidth;
            this.orthoSizeX = (this.renderWidth * this.referenceOrthoSizeX) / this.referenceWidth;
            this.orthoSizeX *= this.orthoScaleFactor;
            this.camera.orthoLeft = -this.orthoSizeX;
            this.camera.orthoRight = this.orthoSizeX;
        }
        if (this.renderHeight != this.canvas.clientHeight)
        {
            this.renderHeight = this.canvas.clientHeight;
            this.orthoSizeY = (this.renderHeight * this.referenceOrthoSizeY) / this.referenceHeight;
            this.orthoSizeY *= this.orthoScaleFactor;
            this.camera.orthoTop = this.orthoSizeY;
            this.camera.orthoBottom = -this.orthoSizeY;
        }
    }

    private createGameEntities(): void
    {
        this.player = new Player(this);
    }

    private onUpdate(dt:number): void
    {
        this.player.update(dt);
    }

    private onRender(): void
    {
        this.refreshCameraParams();
        this.scene.render();
    }
}