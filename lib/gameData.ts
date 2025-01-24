import { GameContextType } from "../constants/types";
import { average, blobsAreTouching, randomColor } from "./mathLib";

class GameData {
  public blobCount: number;
  public gameContextValue: GameContextType;
  private playerAlive: boolean;
  private setPauseState: Function;

  public constructor(
    initBlobCount: number,
    setBlobs: Function,
    setPlayerBlob: Function,
    setPlayerState: Function,
    setPauseState: Function
  ) {
    this.setPauseState = setPauseState;
    this.gameContextValue = {
      ...{
        gameSvgDimensions: [1250, 750],
        gameDimensions: [3200, 3200],
        positionOffset: [0, 0],
        changePositionOffset: () => {
          let i: number;

          for (
            i = 0;
            i < this.gameContextValue.changePositionOffsetFunctions.length;
            i++
          ) {
            this.gameContextValue.changePositionOffsetFunctions[i]();
          }
        },
        changePositionOffsetFunctions: [],
        blobs: [],
        playerBlob: {
          position: [1600, 1600],
          size: 75,
          color: randomColor(),
          id: "playerBlob",
        },
        changeNumberOfBlobs: () => {
          setBlobs(() => {
            this.gameContextValue.blobs.sort((a, b) => a.size - b.size);
            return [...this.gameContextValue.blobs];
          });
          setPlayerBlob({ ...this.gameContextValue.playerBlob });
        },
        blobSpeed: 20000,
        keyDownEventHandlers: [],
        keyUpEventHandlers: [],
        frameRate: 100,
        updateFunctions: [],
      },
    };
    this.blobCount = initBlobCount;
    this.playerAlive = true;

    let i: number = 0;

    for (i = 0; i < 150; i++) {
      this.gameContextValue.blobs.push({
        position: [
          Math.random() * this.gameContextValue.gameDimensions[0],
          Math.random() * this.gameContextValue.gameDimensions[1],
        ],
        size: Math.random() * 50 + 25,
        color: randomColor(),
        id: "unmannedBlob" + this.blobCount,
      });
      this.blobCount++;
    }

    this.gameContextValue.positionOffset = [
      this.gameContextValue.playerBlob.position[0] -
        this.gameContextValue.gameSvgDimensions[0] / 2,
      this.gameContextValue.playerBlob.position[1] -
        this.gameContextValue.gameSvgDimensions[1] / 2,
    ];

    this.gameContextValue.changeNumberOfBlobs();
    this.gameContextValue.changePositionOffset(); //TODO: Prevent blobs from double rendering when game initializes

    document.addEventListener("keydown", ({ key }: { key: string }) => {
      let i: number;

      for (i = 0; i < this.gameContextValue.keyDownEventHandlers.length; i++) {
        this.gameContextValue.keyDownEventHandlers[i](key);
      }
    });

    document.addEventListener("keyup", ({ key }: { key: string }) => {
      let i: number;

      for (i = 0; i < this.gameContextValue.keyUpEventHandlers.length; i++) {
        this.gameContextValue.keyUpEventHandlers[i](key);
      }
    });

    this.gameContextValue.updateFunctions.push(() => {
      let i: number;
      let j: number;
      let k: number;

      for (i = 0; i < this.gameContextValue.blobs.length; i++) {
        if (this.playerAlive) {
          blobsAreTouching(
            this.gameContextValue.playerBlob,
            this.gameContextValue.blobs[i],
            () => {
              this.gameContextValue.blobs[i].size = Math.sqrt(
                this.gameContextValue.blobs[i].size ** 2 +
                  this.gameContextValue.playerBlob.size ** 2
              );

              for (k = 0; k < 3; k++) {
                this.gameContextValue.blobs[i].color[k] = Math.round(
                  average(
                    this.gameContextValue.blobs[i].color[k],
                    this.gameContextValue.playerBlob.color[k],
                    this.gameContextValue.blobs[i].size ** 2 * Math.PI,
                    this.gameContextValue.playerBlob.size ** 2 * Math.PI
                  )
                );
              }

              this.gameContextValue.changeNumberOfBlobs();
              this.playerAlive = false;
              setPlayerState(0); //You Died
            },
            () => {
              this.gameContextValue.playerBlob.size = Math.sqrt(
                this.gameContextValue.playerBlob.size ** 2 +
                  this.gameContextValue.blobs[i].size ** 2
              );

              for (k = 0; k < 3; k++) {
                this.gameContextValue.playerBlob.color[k] = Math.round(
                  average(
                    this.gameContextValue.blobs[i].color[k],
                    this.gameContextValue.playerBlob.color[k],
                    this.gameContextValue.blobs[i].size ** 2 * Math.PI,
                    this.gameContextValue.playerBlob.size ** 2 * Math.PI
                  )
                );
              }
              this.gameContextValue.blobs.splice(i, 1);
              i--;

              this.gameContextValue.changeNumberOfBlobs();
            }
          );
        }

        for (j = i; j < this.gameContextValue.blobs.length; j++) {
          if (i === j) {
            continue;
          }

          blobsAreTouching(
            this.gameContextValue.blobs[i],
            this.gameContextValue.blobs[j],
            () => {
              this.gameContextValue.blobs[j].size = Math.sqrt(
                this.gameContextValue.blobs[i].size ** 2 +
                  this.gameContextValue.blobs[j].size ** 2
              );

              for (k = 0; k < 3; k++) {
                this.gameContextValue.blobs[j].color[k] = Math.round(
                  average(
                    this.gameContextValue.blobs[i].color[k],
                    this.gameContextValue.blobs[j].color[k],
                    this.gameContextValue.blobs[i].size ** 2 * Math.PI,
                    this.gameContextValue.blobs[j].size ** 2 * Math.PI
                  )
                );
              }
              this.gameContextValue.blobs.splice(i, 1);
              this.gameContextValue.changeNumberOfBlobs();
              i--;
            },
            () => {
              this.gameContextValue.blobs[i].size = Math.sqrt(
                this.gameContextValue.blobs[i].size ** 2 +
                  this.gameContextValue.blobs[j].size ** 2
              );

              for (k = 0; k < 3; k++) {
                this.gameContextValue.blobs[i].color[k] = Math.round(
                  average(
                    this.gameContextValue.blobs[i].color[k],
                    this.gameContextValue.blobs[j].color[k],
                    this.gameContextValue.blobs[i].size ** 2 * Math.PI,
                    this.gameContextValue.blobs[j].size ** 2 * Math.PI
                  )
                );
              }
              this.gameContextValue.blobs.splice(j, 1);
              this.gameContextValue.changeNumberOfBlobs();
              j--;
            }
          );
        }
      }
    });

    setPlayerState(true);
    this.setPlayingState(true);
  }

  public setPlayingState(value: boolean): void {
    if (value) {
      this.gameContextValue.updateIntervalId = setInterval(() => {
        let i: number;

        for (i = 0; i < this.gameContextValue.updateFunctions.length; i++) {
          this.gameContextValue.updateFunctions[i]();
        }
      }, 1000 / this.gameContextValue.frameRate);

      this.setPauseState(0);
    } else {
      this.setPauseState(1);
      clearInterval(this.gameContextValue.updateIntervalId);
    }
  }
}

export default GameData;
