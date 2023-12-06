import { FormControl, FormGroup } from "@angular/forms";

export class FormValidations {
    static equalsTo(otherField: string): any {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar o campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if (!field) {
                throw new Error('É necessário informar o campo valido.');
            }

            if (field.value !== formControl.value) {
                return { equalsto: otherField }
            }

            return null;
        };

        return validator;
    }
}