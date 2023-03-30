import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Warning } from './icons';
import { WarningTypes } from './icons';
import { WarningsService } from './warnings.service';

@Component({ selector: 'alert', templateUrl: './warnings.component.html' })
export class WarningsComponent implements OnInit, OnDestroy {
    @Input() name = 'default-warning';
    @Input() remove = true;

    alerts: Warning[] = [];
    activate_alert!: Subscription;
    activate_routes!: Subscription;

    constructor(private router: Router, private service_alert: WarningsService) { }

    ngOnInit() {
        // subscribe to new alert notifications
        this.activate_alert = this.service_alert.show_warn(this.name)
            .subscribe((alert: Warning) => {
                // clear alerts when an empty alert is received
                if (!alert.content) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(warn => warn.static_route);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(warn => delete warn.static_route);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.closing) {
                    setTimeout(() => this.hide_warn(alert), 3000);
                }
           });

        // clear alerts on location change
        this.activate_routes = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.service_alert.clear_warnings(this.name);
            }
        });
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.activate_alert.unsubscribe();
        this.activate_routes.unsubscribe();
    }

    hide_warn(alert: Warning) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.remove) {
            // fade out alert
            alert.fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    checkClass(alert: Warning) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];
                
        const alertTypeClass = {
            [WarningTypes.Success]: 'alert-success',
            [WarningTypes.Error]: 'alert-danger',
            [WarningTypes.Info]: 'alert-info',
            [WarningTypes.Warning]: 'alert-warning'
        }

        if (alert.type !== undefined) {
            classes.push(alertTypeClass[alert.type]);
        }

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}