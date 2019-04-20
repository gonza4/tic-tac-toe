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
    this.gameService.getBoard().subscribe((resultado) => {
      this.cells = resultado.resultado;
      this.isGameFinish = false;

      for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = '';
      }
    })
  }

  startGame(indice : number) {
    this.gameService.postStartGame(indice).subscribe((resultado) => {
      console.log(resultado);
      
      if(undefined !== resultado.finish || (undefined !== resultado.finish && undefined !== resultado.resultado.draw)) {
        this.isGameFinish = true;

        alert(resultado.finish);
      } else if(undefined !== resultado.resultado.draw){
        this.isGameFinish = true;
        
        alert(resultado.draw);
      } else {
        this.cells = resultado.resultado;

        for (var i = 0; i < this.cells.length; i++) {
          if ('number' === typeof this.cells[i]) {
            this.cells[i] = '';
          }
        }
      }
    })
  }
}