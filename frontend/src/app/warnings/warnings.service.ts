import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';


import { Warning } from './icons';
import { WarningTypes } from './icons';
import { WarningOptions } from './icons';

@Injectable({ providedIn: 'root' })
export class WarningsService {
    private data = new Subject<Warning>();
    private defaultName = 'default-warning';

    warn(content: string, options?: WarningOptions) {
        this.display_warn(new Warning({ ...options, type: WarningTypes.Warning, content }));
    }

    // clear alerts
    clear_warnings(id = this.defaultName) {
        this.data.next(new Warning({ id }));
    }

    // enable subscribing to alerts observable
    show_warn(id = this.defaultName): Observable<Warning> {
        return this.data.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    display_success(content: string, options?: WarningOptions) {
        this.display_warn(new Warning({ ...options, type: WarningTypes.Success, content }));
    }

    display_error(content: string, options?: WarningOptions) {
        this.display_warn(new Warning({ ...options, type: WarningTypes.Error, content }));
    }

    display_info(content: string, options?: WarningOptions) {
        this.display_warn(new Warning({ ...options, type: WarningTypes.Info, content }));
    }

    // main alert method    
    display_warn(alert: Warning) {
        alert.id = alert.id || this.defaultName;
        this.data.next(alert);
    }

}