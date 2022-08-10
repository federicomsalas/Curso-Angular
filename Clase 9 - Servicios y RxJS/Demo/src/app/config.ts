import { InjectionToken } from "@angular/core";
import { CursoService } from './services/curso.service';
import { AlumnoService } from './services/alumno.service';

export interface Configuracion {
    experimental: boolean;    
    servicios: any[];
}

export const config: Configuracion = { 
    experimental: true,
    servicios: [
        new CursoService(),
        new AlumnoService
    ]
    
}

export const configtoken = new InjectionToken<Configuracion>('Config');
