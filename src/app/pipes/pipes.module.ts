import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUnderscoresPipe } from './remove-underscores.pipe';
import { ChanelNamePipe } from './chanel-name.pipe';

@NgModule({
  declarations: [RemoveUnderscoresPipe, ChanelNamePipe],
  imports: [
    CommonModule
  ],
  exports: [RemoveUnderscoresPipe, ChanelNamePipe]
})
export class PipesModule { }
