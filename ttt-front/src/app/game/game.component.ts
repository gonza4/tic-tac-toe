import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  public cells = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getBoard().subscribe((resultado) => {
      this.cells = resultado.resultado;

      for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = '';
      }
    })
  }
}