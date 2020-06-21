import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./helpers/auth.guard";
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "Panel",
    loadChildren: () =>
      import("../app/panel/panel.module").then((m) => m.PanelModule)
  },
  { path: "", redirectTo: "Panel", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
