import { Component, OnInit, signal } from '@angular/core';
import { Toast } from '../../../../service/toast';
import { BasketServices } from '../../../../service/basket-services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { BaseIcon } from "primeng/icons/baseicon";
import { ReuseInputs } from "../../../Components/forms/reuse-inputs/reuse-inputs";
import { Button } from "primeng/button";

@Component({
  selector: 'app-shipping-form',
  imports: [StepperModule, FormsModule, ReactiveFormsModule, ReuseInputs, Button],
  templateUrl: './shipping-form.html',
  styleUrl: './shipping-form.css',
})
export class ShippingForm implements OnInit {
  ShippingAddress!: FormGroup;
  ShippingMethod!: FormGroup;
  PaymentDetails!: FormGroup;


  activeStep = signal(1);
  constructor(
    private basketService: BasketServices,
    private toast: Toast,
    private formBuilder: FormBuilder

  ) { }
  ngOnInit(): void {
    this.formStepper();
  }

  formStepper() {
    this.ShippingAddress = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      City: [''],
      ZipCode: [''],
      Street: [''],
      State: [''],
    });
    this.ShippingMethod = this.formBuilder.group({
      shippingMethod: [''],
    });
    this.PaymentDetails = this.formBuilder.group({
      cardNumber: [''],
      expirationDate: [''],
      cvv: [''],
    });
  }

    nextStep(activateCallback: (step: number) => void, step: number, form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    activateCallback(step);
  }
  startOver(activateCallback: (step: number) => void) {
    this.ShippingAddress.reset();
    this.ShippingMethod.reset();
    this.PaymentDetails.reset();
    activateCallback(1);
  }


}
