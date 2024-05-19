import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectChangeEventDetail } from '@ionic/angular/standalone';
import { UserSave } from 'src/app/interfaces/userSave';
import { addIcons } from 'ionicons'; // Import this
import { calendarOutline, callOutline, earthOutline, homeOutline, keyOutline, mailOutline, personCircleOutline, personOutline, transgenderOutline} from 'ionicons/icons';
import { StatesService } from 'src/app/services/states.service';
import { Cities, States } from 'src/app/interfaces/address';
import { DatetimeChangeEventDetail, IonDatetimeCustomEvent, IonSelectCustomEvent } from '@ionic/core';
import { USER } from 'src/app/const/localStorageConst';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, UserFormComponent]
})
export class UserFormComponent  implements OnInit {

  form!: FormGroup;
  states : States[] = []
  cities: Cities[] = []
  citiesSelected = ""
  EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  birthDay = ""
  @Output() userChanged: EventEmitter<UserSave> = new EventEmitter<UserSave>();
  @Input() isRegistry = true;
  user: any


  constructor(private formBuilder: FormBuilder ,
    private statesService: StatesService) {
    addIcons({ personOutline, personCircleOutline, mailOutline, keyOutline, calendarOutline,
      transgenderOutline, earthOutline, homeOutline, callOutline });
  }

  ngOnInit(): void {
    this.statesService.getStates().subscribe((states:States[]) => this.states = states);
    if (this.isRegistry) {
      this.buildForm()
    } else {
      const userString = localStorage.getItem(USER);
      if (userString) {
        this.user = JSON.parse(userString);
        console.log(this.user);
        this.loadForm();
      } else {
        console.error('No user found in localStorage');
      }
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      lastName: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGEXP)]],
      password: ['', [Validators.required,
                      Validators.minLength(8),
                      Validators.maxLength(50),
                     ]
                ],
      confirmPassword: ['', [Validators.required,
                             Validators.minLength(8),
                             Validators.maxLength(50)
                            ]
                        ],
      dni: ['', [Validators.required,Validators.minLength(8)],],
      birthday: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
    });
  }


  loadForm() {
    this.form = this.formBuilder.group({
      name: [this.user.name,[Validators.required, Validators.minLength(4)]],
      lastName: [this.user.lastName,[Validators.required, Validators.minLength(4)]],
      email: [this.user.email,],
      dni: [this.user.dni],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      birthday: [this.user.birthday,[Validators.required]],
      gender: [this.user.gender,[Validators.required]],
      city: [this.user.city,[Validators.required]],
      state: [this.user.state,[Validators.required]]
    });
  }

  validFieldRequired(field :string): boolean{
    return this.form.get(field)?.errors?.['required'] && this.form.get(field)?.touched
  }

  validFieldMinLength(field :string): boolean{
    return (this.form.get(field)?.errors?.['minlength']?.actualLength != this.form.get(field)?.errors?.['minlength']?.requiredLength
    && this.form.get(field)?.touched) || false;
  }

  validFieldPattern(field :string):boolean{
    return this.form.get(field)?.errors?.['pattern'] && this.form.get(field)?.touched
  }

  validFieldPassword(): boolean{
    return (this.form.get('confirmPassword')?.touched ?? false)  && this.form.value.password != this.form.value.confirmPassword
             && !this.validFieldMinLength('confirmPassword') && !this.validFieldRequired('confirmPassword')
              && this.form.get('password')?.value !== ''
  }

  registry() {

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.userChanged.emit(this.formToUser())
  }

  formToUser(): UserSave{
    return {
      name: this.form.get('name')?.value || '',
      lastName: this.form.get('lastName')?.value || '',
      email: this.form.get('email')?.value || '',
      dni: this.form.get('dni')?.value || '',
      birthday: this.form.get('birthday')?.value || '',
      phoneNumber: this.form.get('phoneNumber')?.value || '',
      state: this.form.get('state')?.value || '',
      city: this.form.get('city')?.value || '',
      gender: this.form.get('gender')?.value || '',
      password: this.form.get('password')?.value || '',
    }
  }



  changeState(event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    const state = this.states.find((state:States)=> state.id === event.detail.value)
    this.form.get('state')?.setValue(state?.stateName)
    this.form.get('city')?.setValue('')
    this.statesService.getCities(event.detail.value).subscribe((cities:Cities[]) => { this.cities = cities})
  }

  setBirthday(birthday: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) {
    this.form.get('birthday')?.setValue(birthday.detail.value?.slice(0,10) as string)
  }

  setGender($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    this.form.get('gender')?.setValue($event.detail.value)
  }

  changeCity($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {
    this.form.get('city')?.setValue($event.detail.value)
  }

  update() {
    console.log(this.form);
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.userChanged.emit(this.formToUser())
  }

}
