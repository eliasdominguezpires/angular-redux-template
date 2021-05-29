import { Routes } from "@angular/router"
import { DetalleComponent } from "../components/modules/common/ingreso-egreso/detalle/detalle.component";
import { EstadisticaComponent } from "../components/modules/common/ingreso-egreso/estadistica/estadistica.component";
import { IngresoEgresoComponent } from "../components/modules/common/ingreso-egreso/ingreso-egreso.component";

export const dashboardRoutes: Routes = [
  { path: '', component: EstadisticaComponent },
  { path: 'ingreso-egreso', component: IngresoEgresoComponent },
  { path: 'detalle', component: DetalleComponent },

];
