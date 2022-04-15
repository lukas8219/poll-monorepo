import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './poll-result.component.html',
  selector: '[poll-result]',
})
export class PollResultComponent {
  private readonly CONFIG = {
    REFUSED: {
      style: 'badge-danger bg-danger',
      language: 'Reprovada',
    },
    APPROVED: {
      style: 'badge-success bg-success',
      language: 'Aprovada',
    },
    OCCURRING: {
      style: 'badge-info bg-info',
      language: 'Votacão ocorrendo',
    },
    TIED: {
      style: 'badge-warning bg-warning',
      language: 'Votação empatada',
    },
    UNKNOWN: {
      style: 'badge-dark',
      language: 'Desconhecido',
    },
  };

  @Input() result: PollResultType;

  get badgeStyle(): string {
    return this.CONFIG[this.result || 'UNKNOWN'].style;
  }

  get resultLanguage(): string {
    return this.CONFIG[this.result || 'UNKNOWN'].language;
  }
}

type PollResultType = 'REFUSED' | 'APPROVED' | 'TIED' | 'UNKNOWN' | undefined;
