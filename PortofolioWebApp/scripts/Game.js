window.onload = function () {
    var main = new Game();
};
var Game = (function () {
    function Game() {
        var _this = this;
        this.SCENE_PATH = "scene/";
        this.referenceWidth = 1920;
        this.referenceHeight = 1080;
        this.referenceOrthoSizeX = 16;
        this.referenceOrthoSizeY = 9;
        this.renderWidth = 0;
        this.renderHeight = 0;
        this.orthoSizeX = 0;
        this.orthoSizeY = 0;
        this.orthoScaleFactor = 1.2;
        this.document = document;
        if (BABYLON.Engine.isSupported()) {
            this.canvas = document.getElementById("renderCanvas");
            this.engine = new BABYLON.Engine(this.canvas, true);
            BABYLON.SceneLoader.Load(this.SCENE_PATH, "ExportDemo.babylon", this.engine, function (scene) {
                _this.scene = scene;
                scene.executeWhenReady(function () {
                    _this.configureCamera();
                    _this.createGameEntities();
                    _this.registerForInput();
                    _this.scene.debugLayer.show(true);
                    _this.engine.runRenderLoop(function () {
                        _this.onRender();
                    });
                });
                scene.registerBeforeRender(function () {
                    var dt = _this.engine.getDeltaTime() / 1000;
                    _this.onUpdate(dt);
                });
            });
            window.addEventListener("resize", function () {
                _this.engine.resize();
            });
        }
    }
    Game.prototype.configureCamera = function () {
        this.camera = this.scene.activeCamera;
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this.refreshCameraParams();
    };
    Game.prototype.refreshCameraParams = function () {
        if (this.renderWidth != this.canvas.clientWidth) {
            this.renderWidth = this.canvas.clientWidth;
            this.orthoSizeX = (this.renderWidth * this.referenceOrthoSizeX) / this.referenceWidth;
            this.orthoSizeX *= this.orthoScaleFactor;
            this.camera.orthoLeft = -this.orthoSizeX;
            this.camera.orthoRight = this.orthoSizeX;
        }
        if (this.renderHeight != this.canvas.clientHeight) {
            this.renderHeight = this.canvas.clientHeight;
            this.orthoSizeY = (this.renderHeight * this.referenceOrthoSizeY) / this.referenceHeight;
            this.orthoSizeY *= this.orthoScaleFactor;
            this.camera.orthoTop = this.orthoSizeY;
            this.camera.orthoBottom = -this.orthoSizeY;
        }
    };
    Game.prototype.createGameEntities = function () {
        this.player = new Player(this);
    };
    Game.prototype.registerForInput = function () {
        this.input = new Input();
        this.input.registerForInputEvents(this);
    };
    Game.prototype.onUpdate = function (dt) {
        this.player.update(dt);
    };
    Game.prototype.onRender = function () {
        this.refreshCameraParams();
        this.scene.render();
    };
    Game.prototype.handleKeyDown = function (evt) {
        console.log("handleKeyDown() evt: " + evt);
    };
    Game.prototype.handleKeyUp = function (evt) {
        console.log("handleKeyUp() evt: " + evt);
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map