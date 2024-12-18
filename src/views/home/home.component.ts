import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ExampleService } from '@/services/example.service'
import { AsyncPipe } from '@angular/common'
import { BehaviorSubject, delay, merge, switchMap, tap } from 'rxjs'
import { Example } from '@/models/example'

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  exampleService = inject(ExampleService)
  reload$ = new BehaviorSubject<null>(null)
  examples$ = merge(this.reload$).pipe(
    switchMap(() => {
      return this.exampleService.load().pipe(tap(console.log))
    }),
  )

  delete(item: Example) {
    const yes = confirm(`ARE YOU SURE THAT YOU WANT DELETE  (${item.name} )`)

    yes &&
      item
        .delete()
        .pipe(delay(0))
        .subscribe(() => {
          this.reload$.next(null)
          alert('Item Deleted Successfully')
        })
  }
}
