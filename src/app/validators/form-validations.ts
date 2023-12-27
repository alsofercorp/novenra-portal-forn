import { FormControl, FormGroup } from "@angular/forms";

export class FormValidations {
    static equalsTo(fieldName: string): any {
        const validator = (formControl: FormControl) => {
            if (fieldName == null) {
                throw new Error('É necessário informar o campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(fieldName);

            if (!field) {
                throw new Error('É necessário informar o campo valido.');
            }

            if (field.value !== formControl.value) {
                return { equalsto: fieldName }
            }

            return null;
        };

        return validator;
    }

    static DateValidator(fieldName: string): any {
        const validator = (formControl: FormControl) => {
            if (fieldName == null) {
                throw new Error('É necessário informar o campo.');
            }

            if (!formControl.root || !(<FormGroup>formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup>formControl.root).get(fieldName);

            if (!field) {
                throw new Error('É necessário informar uma data valida.');
            }

            if (field.value) {
                const selected: any = new Date(new Date(field.value).toDateString());
                const now: any = new Date(new Date().toDateString());

                if (selected < now) {
                    return { datevalidation: 'É necessário informar uma data valida.' }
                }
            }

            return null;
        }

        return validator;
    }
}