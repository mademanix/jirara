import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {BehaviorSubject, Subscription} from "rxjs";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {
  AnalystsTeamDescription,
  BEDevDescription,
  FEDevDescription,
  TeamsCallsDescription,
  TestsTeamDescription
} from "../consts/description.const";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {GeneratedJiraTextComponent} from "./shared/lib/components/generated-jira-text/generated-jira-text.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatInput,
    MatFormField,
    MatLabel,
    MatDivider, AsyncPipe, JsonPipe, CdkCopyToClipboard, MatButton, MatGridList, MatGridTile, GeneratedJiraTextComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected jiraDescTypeForm: FormGroup<any>;

  protected descType: {id: number, value: string}[] = [
    {id: 0, value: 'Rozmowy na Teams'},
    {id: 1, value: 'Pracy developera FE'},
    {id: 2, value: 'Pracy developera BE'},
    {id: 3, value: 'Pracy testera'},
    {id: 4, value: 'Pracy analityka'},
  ];

  protected generatedText$: BehaviorSubject<string> = new BehaviorSubject('');


  private subs: Subscription = new Subscription();

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.listenForFormChanges();
  }

  public textCopied(): void {
    this.snackBar.open('Skopiowano tekst!', 'OK');
  }

  public forceGenerate(): void {
    if(this.jiraDescTypeForm.invalid) {
      return;
    }
    const {type, countOfSentences} = this.jiraDescTypeForm.value;
    this.generateJiraText(type, countOfSentences);
  }

  private listenForFormChanges(): void {
    this.subs.add(
      this.jiraDescTypeForm.valueChanges.subscribe(({type, countOfSentences}) => {
        if(this.jiraDescTypeForm.invalid) {
          return;
        }
        this.generateJiraText(type, countOfSentences);
      })
    )
  }

  private initForm() {
    this.jiraDescTypeForm = new FormGroup<any>({
      type: new FormControl(null),
      countOfSentences: new FormControl(0),
    })
  }

  private getRandomizedText(descriptions: string[], count: number): string {
    return descriptions
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, count)
      .join(', ');
  };

  private generateJiraText(type: number, countOfSentences: number): void {
    let descriptions: string[];

    switch (type) {
      case 0:
        descriptions = TeamsCallsDescription;
        break;
      case 1:
        descriptions = FEDevDescription;
        break;
      case 2:
        descriptions = BEDevDescription;
        break;
      case 3:
        descriptions = TestsTeamDescription;
        break;
      case 4:
        descriptions = AnalystsTeamDescription;
        break;
      default:
        descriptions = [];
    }

    this.generatedText$.next(this.getRandomizedText(descriptions, countOfSentences));
  }
}
