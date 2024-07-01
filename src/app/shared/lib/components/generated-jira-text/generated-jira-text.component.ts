import {Component, Input} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-generated-jira-text[generatedText]',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatGridList,
    MatGridTile,
    CdkCopyToClipboard,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatDivider,
  ],
  templateUrl: './generated-jira-text.component.html',
  styleUrl: './generated-jira-text.component.css'
})
export class GeneratedJiraTextComponent {
  @Input() public generatedText: string;

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  protected textCopied(): void {
    this.snackBar.open('Skopiowano tekst!', 'OK');
  }
}
