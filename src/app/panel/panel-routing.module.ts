import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { CompleteStatisticsComponent } from './pages/complete-statistics/complete-statistics.component';
import { RoomListComponent } from './pages/room-list/room-list.component';


const routes: Routes = [
   {
     path: '', component: PanelComponent, children: [
       {path: '', component: CompleteStatisticsComponent},
       {path: 'room', component: RoomListComponent}
     ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
