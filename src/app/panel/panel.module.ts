import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel/panel.component';
import { HeaderComponent } from './header/header.component';
import { MenuesComponent } from './menues/menues.component';
import { CompleteStatisticsComponent } from './pages/complete-statistics/complete-statistics.component';
import { RoomListComponent } from './pages/room-list/room-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { PanelRoutingModule } from './panel-routing.module';
import { LoginComponent } from '../pages/login/login.component';



@NgModule({
  declarations: [
    PanelComponent,
    HeaderComponent,
    MenuesComponent,
    CompleteStatisticsComponent,
    RoomListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PanelRoutingModule
  ]
})
export class PanelModule { }
