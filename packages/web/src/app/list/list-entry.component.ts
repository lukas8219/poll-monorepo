import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[list-entry]',
  template: `
    <td>
      <div class="d-flex align-items-center">
        <div class="ms-3">
          <p class="fw-bold mb-1">{{ poll.subject }}</p>
        </div>
      </div>
    </td>
    <td poll-result [result]="poll.result"></td>
    <td>
      <button
        type="button"
        class="btn btn-link btn-rounded btn-sm fw-bold"
        data-mdb-ripple-color="dark"
      >
        Edit
      </button>
    </td>
  `,
})
export class ListEntryComponent implements OnInit {
  @Input() poll: any = {};
  ngOnInit(): void {}
}
