import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  public cells = [];
  public isGameFinish = false;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getBoard().subscribe((result) => {
      this.cells = result.result;
      this.isGameFinish = false;

      for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = '';
      }
    })
  }

  startGame(indice : number) {
    this.gameService.postStartGame(indice).subscribe((result) => {
      
      if(undefined !== result.finish || (undefined !== result.finish && undefined !== result.result.draw)) {
        this.isGameFinish = true;

        alert(result.finish);
      } else if(undefined !== result.result.draw){
        this.isGameFinish = true;
        
        alert(result.draw);
      } else {
        this.cells = result.result;

        for (var i = 0; i < this.cells.length; i++) {
          if ('number' === typeof this.cells[i]) {
            this.cells[i] = '';
          }
        }
      }
    })
  }
}