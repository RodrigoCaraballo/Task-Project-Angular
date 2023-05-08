import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'statusFirabasePipe' })
export class StatusFirabasePipe implements PipeTransform {
  transform(value: string): string {
    if(value === 'Ok') return 'Login successful'
    if(value === 'auth/invalid-email') return 'No valid credentials, please try again'
    else return 'Something went wrong, please try again'
  }
}
