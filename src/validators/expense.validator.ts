/* eslint-disable prettier/prettier */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'dataPassada', async: false })
export class DataPassada implements ValidatorConstraintInterface {
  validate(dateString: string) {
    const currentDate = new Date();
    const date = new Date(Date.parse(dateString));
    return date <= currentDate;
  }

  defaultMessage() {
    return 'The date cannot be in the future or its format is incorrect';
  }
}